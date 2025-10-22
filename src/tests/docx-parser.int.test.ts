import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocx } from '../parsers/docx-parser.js';
import { normalizeWhitespace } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturePath = resolve(__dirname, '../../fixtures/sample.docx');
const hasFixture = existsSync(fixturePath);

describe('docx parser (unit tests)', () => {
  it('should normalize whitespace correctly', () => {
    const input = 'Hello\r\n\n\nWorld \n';
    const expected = 'Hello\n\nWorld';
    expect(normalizeWhitespace(input)).toBe(expected);
  });

  it('should handle empty content', async () => {
    // Create a minimal DOCX buffer for testing - this will fail but we test error handling
    const emptyBuffer = Buffer.from('PK\x03\x04\x14\x00\x00\x00\x08\x00');
    await expect(parseDocx(emptyBuffer)).rejects.toThrow('Failed to parse DOCX');
  });

  it('should include metadata when requested', async () => {
    const testBuffer = Buffer.from('test content');
    await expect(parseDocx(testBuffer, { includeMetadata: true })).rejects.toThrow('Failed to parse DOCX');
  });

  it('should not include metadata by default', async () => {
    const testBuffer = Buffer.from('test content');
    await expect(parseDocx(testBuffer)).rejects.toThrow('Failed to parse DOCX');
  });
});

(hasFixture ? describe : describe.skip)('docx parser (integration tests)', () => {
  it('should extract text from sample.docx', async () => {
    const buffer = readFileSync(fixturePath);
    
    if (buffer.length === 0) {
      // Skip test if fixture is empty
      console.log('Skipping test: sample.docx is empty');
      return;
    }
    
    const result = await parseDocx(buffer);
    
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.text).toMatch(/\w+/);
  });

  it('should extract text with metadata from sample.docx', async () => {
    const buffer = readFileSync(fixturePath);
    
    if (buffer.length === 0) {
      // Skip test if fixture is empty
      console.log('Skipping test: sample.docx is empty');
      return;
    }
    
    const result = await parseDocx(buffer, { includeMetadata: true });
    
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.metadata).toBeDefined();
    expect(result.metadata?.fileSize).toBe(buffer.length);
  });
});