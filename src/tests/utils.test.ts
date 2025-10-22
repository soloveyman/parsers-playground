import { describe, it, expect } from 'vitest';
import { 
  normalizeWhitespace, 
  createParseMetadata, 
  getFileType, 
  validateBuffer,
  applyParserOptions 
} from '../utils.js';

describe('utils', () => {
  describe('normalizeWhitespace', () => {
    it('should remove carriage returns', () => {
      expect(normalizeWhitespace('Hello\r\nWorld')).toBe('Hello\nWorld');
    });

    it('should normalize multiple spaces before newlines', () => {
      expect(normalizeWhitespace('Hello   \nWorld')).toBe('Hello\nWorld');
    });

    it('should normalize multiple tabs before newlines', () => {
      expect(normalizeWhitespace('Hello\t\t\nWorld')).toBe('Hello\nWorld');
    });

    it('should reduce multiple newlines to double newlines', () => {
      expect(normalizeWhitespace('Hello\n\n\n\nWorld')).toBe('Hello\n\nWorld');
    });

    it('should trim whitespace', () => {
      expect(normalizeWhitespace('  Hello World  ')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(normalizeWhitespace('')).toBe('');
    });

    it('should handle only whitespace', () => {
      expect(normalizeWhitespace('   \n\n   ')).toBe('');
    });
  });

  describe('createParseMetadata', () => {
    it('should create metadata with default values', () => {
      const metadata = createParseMetadata();
      
      expect(metadata.fileName).toBeUndefined();
      expect(metadata.fileSize).toBeUndefined();
      expect(metadata.parsedAt).toBeInstanceOf(Date);
      expect(metadata.parserVersion).toBe('1.0.0');
    });

    it('should create metadata with custom values', () => {
      const fileName = 'test.docx';
      const fileSize = 1024;
      const parserVersion = '2.0.0';
      
      const metadata = createParseMetadata(fileName, fileSize, parserVersion);
      
      expect(metadata.fileName).toBe(fileName);
      expect(metadata.fileSize).toBe(fileSize);
      expect(metadata.parsedAt).toBeInstanceOf(Date);
      expect(metadata.parserVersion).toBe(parserVersion);
    });
  });

  describe('getFileType', () => {
    it('should detect DOCX files', () => {
      expect(getFileType('document.docx')).toBe('docx');
      expect(getFileType('DOCUMENT.DOCX')).toBe('docx');
      expect(getFileType('path/to/file.docx')).toBe('docx');
    });

    it('should detect XLSX files', () => {
      expect(getFileType('spreadsheet.xlsx')).toBe('xlsx');
      expect(getFileType('SPREADSHEET.XLSX')).toBe('xlsx');
      expect(getFileType('path/to/file.xlsx')).toBe('xlsx');
    });

    it('should return null for unsupported files', () => {
      expect(getFileType('document.pdf')).toBeNull();
      expect(getFileType('file.txt')).toBeNull();
      expect(getFileType('no-extension')).toBeNull();
      expect(getFileType('')).toBeNull();
    });
  });

  describe('validateBuffer', () => {
    it('should accept valid Buffer', () => {
      const buffer = Buffer.from('test content');
      expect(() => validateBuffer(buffer)).not.toThrow();
    });

    it('should reject non-Buffer input', () => {
      expect(() => validateBuffer('string')).toThrow('Input must be a Buffer');
      expect(() => validateBuffer(123)).toThrow('Input must be a Buffer');
      expect(() => validateBuffer(null)).toThrow('Input must be a Buffer');
      expect(() => validateBuffer(undefined)).toThrow('Input must be a Buffer');
    });

    it('should reject empty Buffer', () => {
      const emptyBuffer = Buffer.alloc(0);
      expect(() => validateBuffer(emptyBuffer)).toThrow('Buffer cannot be empty');
    });
  });

  describe('applyParserOptions', () => {
    it('should normalize whitespace by default', () => {
      const text = 'Hello   \n\n\nWorld';
      const result = applyParserOptions(text);
      expect(result).toBe('Hello\n\nWorld');
    });

    it('should not normalize whitespace when disabled', () => {
      const text = 'Hello   \n\n\nWorld';
      const result = applyParserOptions(text, { normalizeWhitespace: false });
      expect(result).toBe(text);
    });

    it('should handle empty options', () => {
      const text = 'Hello World';
      const result = applyParserOptions(text, {});
      expect(result).toBe('Hello World');
    });

    it('should handle undefined options', () => {
      const text = 'Hello World';
      const result = applyParserOptions(text);
      expect(result).toBe('Hello World');
    });
  });
});
