import mammoth from 'mammoth';
import type { ParseResult, ParserOptions } from '../types.js';
import { applyParserOptions, createParseMetadata } from '../utils.js';

/**
 * Parses a DOCX file and extracts text content
 */
export async function parseDocx(
  buffer: Buffer,
  options: ParserOptions = {}
): Promise<ParseResult> {
  try {
    const { value } = await mammoth.extractRawText({ buffer });
    const text = applyParserOptions(value, options);
    
    const result: ParseResult = {
      text,
      ...(options.includeMetadata && {
        metadata: createParseMetadata(undefined, buffer.length),
      }),
    };
    
    return result;
  } catch (error) {
    throw new Error(`Failed to parse DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}