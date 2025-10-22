/**
 * Shared types for the parsers project
 */

export interface ParseResult {
  readonly text: string;
  readonly metadata?: ParseMetadata;
}

export interface ParseMetadata {
  readonly fileName?: string | undefined;
  readonly fileSize?: number | undefined;
  readonly parsedAt: Date;
  readonly parserVersion: string;
}

export interface ParserOptions {
  readonly normalizeWhitespace?: boolean;
  readonly includeMetadata?: boolean;
}

export type SupportedFileType = 'docx' | 'xlsx';

export interface ParserError extends Error {
  readonly code: string;
  readonly fileName?: string | undefined;
}

export class UnsupportedFileTypeError extends Error implements ParserError {
  readonly code = 'UNSUPPORTED_FILE_TYPE';
  
  constructor(fileName: string, supportedTypes: readonly SupportedFileType[]) {
    super(`Unsupported file type for ${fileName}. Supported types: ${supportedTypes.join(', ')}`);
    this.name = 'UnsupportedFileTypeError';
  }
}

export class FileReadError extends Error implements ParserError {
  readonly code = 'FILE_READ_ERROR';
  readonly fileName: string;
  
  constructor(fileName: string, cause?: Error) {
    super(`Failed to read file ${fileName}: ${cause?.message ?? 'Unknown error'}`);
    this.name = 'FileReadError';
    this.fileName = fileName;
    this.cause = cause;
  }
}

export class ParseError extends Error implements ParserError {
  readonly code = 'PARSE_ERROR';
  readonly fileName?: string | undefined;
  
  constructor(message: string, fileName?: string, cause?: Error) {
    super(`Parse error${fileName ? ` in ${fileName}` : ''}: ${message}`);
    this.name = 'ParseError';
    if (fileName !== undefined) {
      this.fileName = fileName;
    }
    this.cause = cause;
  }
}
