// Global type declarations

declare module 'mammoth' {
  interface ExtractRawTextOptions {
    buffer: Buffer;
  }
  
  interface ExtractRawTextResult {
    value: string;
    messages: any[];
  }
  
  export function extractRawText(options: ExtractRawTextOptions): Promise<ExtractRawTextResult>;
}

declare module 'xlsx' {
  export interface WorkBook {
    SheetNames: string[];
    Sheets: { [sheetName: string]: any };
  }
  
  export interface WritingOptions {
    type: 'buffer';
    bookType: 'xlsx';
  }
  
  export const utils: {
    book_new(): WorkBook;
    aoa_to_sheet(data: any[][]): any;
    book_append_sheet(workbook: WorkBook, worksheet: any, name: string): void;
    sheet_to_json<T>(sheet: any, options?: { header?: number; defval?: any }): T[];
  };
  
  export function read(buffer: Buffer, options: { type: 'buffer' }): WorkBook;
  export function write(workbook: WorkBook, options: WritingOptions): Buffer;
}

declare module 'commander' {
  export class Command {
    name(name: string): this;
    description(description: string): this;
    version(version: string): this;
    argument(name: string, description: string): this;
    option(flags: string, description: string): this;
    action(fn: (filePath: string, options: any) => void | Promise<void>): this;
    parse(): void;
  }
}

declare module 'chalk' {
  export function red(text: string): string;
  export function green(text: string): string;
  export function blue(text: string): string;
  export function yellow(text: string): string;
  export function cyan(text: string): string;
  export function magenta(text: string): string;
  export function white(text: string): string;
  export function gray(text: string): string;
  export function grey(text: string): string;
  export function black(text: string): string;
  export function bgRed(text: string): string;
  export function bgGreen(text: string): string;
  export function bgBlue(text: string): string;
  export function bgYellow(text: string): string;
  export function bgCyan(text: string): string;
  export function bgMagenta(text: string): string;
  export function bgWhite(text: string): string;
  export function bgBlack(text: string): string;
  export function bold(text: string): string;
  export function dim(text: string): string;
  export function italic(text: string): string;
  export function underline(text: string): string;
  export function strikethrough(text: string): string;
  export function reset(text: string): string;
  export function inverse(text: string): string;
  export function hidden(text: string): string;
  export function visible(text: string): string;
}
