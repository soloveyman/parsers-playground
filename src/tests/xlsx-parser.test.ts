import { describe, it, expect } from 'vitest';
import * as XLSX from 'xlsx';
import { parseXlsx } from '../parsers/xlsx-parser.js';
import { normalizeWhitespace } from '../utils.js';

function createTestWorkbook(): Buffer {
  const workbook = XLSX.utils.book_new();
  const data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'Berlin'],
    ['Bob', null, 'Paris'],
    ['Charlie', 25, 'London'],
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'People');
  
  const options: XLSX.WritingOptions = { 
    type: 'buffer', 
    bookType: 'xlsx' 
  };
  return XLSX.write(workbook, options) as Buffer;
}

describe('xlsx parser', () => {
  it('should normalize whitespace correctly', () => {
    const input = 'a \n\n\n b\r\n';
    const expected = 'a\n\n b';
    expect(normalizeWhitespace(input)).toBe(expected);
  });

  it('should parse workbook buffer into text', async () => {
    const buffer = createTestWorkbook();
    const result = await parseXlsx(buffer);
    
    expect(result.text).toContain('# People');
    expect(result.text).toContain('Name | Age | City');
    expect(result.text).toContain('Alice | 30 | Berlin');
    expect(result.text).toContain('Bob | Paris');
    expect(result.text).toContain('Charlie | 25 | London');
  });

  it('should include metadata when requested', async () => {
    const buffer = createTestWorkbook();
    const result = await parseXlsx(buffer, { includeMetadata: true });
    
    expect(result.metadata).toBeDefined();
    expect(result.metadata?.fileSize).toBe(buffer.length);
    expect(result.metadata?.parsedAt).toBeInstanceOf(Date);
    expect(result.metadata?.parserVersion).toBe('1.0.0');
  });

  it('should handle empty workbook', async () => {
    const workbook = XLSX.utils.book_new();
    // Add an empty sheet to make it valid
    const emptySheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, emptySheet, 'Empty');
    
    const options: XLSX.WritingOptions = { 
      type: 'buffer', 
      bookType: 'xlsx' 
    };
    const buffer = XLSX.write(workbook, options) as Buffer;
    
    const result = await parseXlsx(buffer);
    expect(result.text).toBe('');
  });

  it('should handle workbook with empty sheets', async () => {
    const workbook = XLSX.utils.book_new();
    const emptySheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, emptySheet, 'Empty');
    
    const options: XLSX.WritingOptions = { 
      type: 'buffer', 
      bookType: 'xlsx' 
    };
    const buffer = XLSX.write(workbook, options) as Buffer;
    
    const result = await parseXlsx(buffer);
    expect(result.text).toBe('');
  });

  it('should handle invalid buffer gracefully', async () => {
    const invalidBuffer = Buffer.from('invalid xlsx content');
    
    // XLSX library is very permissive and will try to parse anything
    // So we test that it returns some result rather than throwing
    const result = await parseXlsx(invalidBuffer);
    expect(result.text).toBeDefined();
    expect(typeof result.text).toBe('string');
  });
});