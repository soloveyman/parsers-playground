import * as XLSX from 'xlsx';
import type { ParseResult, ParserOptions } from '../types.js';
import { applyParserOptions, createParseMetadata } from '../utils.js';

/**
 * Parses an XLSX file and extracts text content
 */
export async function parseXlsx(
  buffer: Buffer,
  options: ParserOptions = {}
): Promise<ParseResult> {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const parts: string[] = [];

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;

      const json = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, { 
        header: 1,
        defval: null,
      });
      
      const rows = (json as (string | number | null)[][])
        .map((row) => row.filter(Boolean).join(' | '))
        .filter(Boolean) as string[];

      if (rows.length > 0) {
        parts.push(`# ${sheetName}\n${rows.join('\n')}`);
      }
    }

    const text = applyParserOptions(parts.join('\n\n'), options);
    
    const result: ParseResult = {
      text,
      ...(options.includeMetadata && {
        metadata: createParseMetadata(undefined, buffer.length),
      }),
    };
    
    return result;
  } catch (error) {
    throw new Error(`Failed to parse XLSX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}