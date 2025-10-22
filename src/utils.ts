/**
 * Shared utilities for parsers
 */

import type { ParseMetadata, ParserOptions } from './types.js';

/**
 * Normalizes whitespace in text content
 */
export function normalizeWhitespace(text: string): string {
  return text
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Creates parse metadata
 */
export function createParseMetadata(
  fileName?: string,
  fileSize?: number,
  parserVersion = '1.0.0'
): ParseMetadata {
  return {
    ...(fileName !== undefined && { fileName }),
    ...(fileSize !== undefined && { fileSize }),
    parsedAt: new Date(),
    parserVersion,
  };
}

/**
 * Determines file type from file name
 */
export function getFileType(fileName: string): 'docx' | 'xlsx' | null {
  const ext = fileName.toLowerCase().split('.').pop();
  switch (ext) {
    case 'docx':
      return 'docx';
    case 'xlsx':
      return 'xlsx';
    default:
      return null;
  }
}

/**
 * Validates buffer input
 */
export function validateBuffer(buffer: unknown): asserts buffer is Buffer {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('Input must be a Buffer');
  }
  if (buffer.length === 0) {
    throw new Error('Buffer cannot be empty');
  }
}

/**
 * Applies parser options to text
 */
export function applyParserOptions(
  text: string,
  options: ParserOptions = {}
): string {
  if (options.normalizeWhitespace !== false) {
    return normalizeWhitespace(text);
  }
  return text;
}
