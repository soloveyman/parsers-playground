#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';
import { parseDocx, parseXlsx, getFileType, UnsupportedFileTypeError, FileReadError, ParseError } from './parsers/index.js';

const program = new Command();

program
  .name('parsers-cli')
  .description('Extract text from DOCX and XLSX files')
  .version('1.0.0')
  .argument('<file>', 'Path to the file to parse')
  .option('-m, --metadata', 'Include metadata in output')
  .option('-j, --json', 'Output as JSON')
  .option('-o, --output <file>', 'Write output to file instead of stdout')
  .action(async (filePath: string, options: { metadata?: boolean; json?: boolean; output?: string }) => {
    try {
      const resolvedPath = resolve(filePath);
      const fileType = getFileType(filePath);
      
      if (!fileType) {
        throw new UnsupportedFileTypeError(filePath, ['docx', 'xlsx']);
      }

      const buffer = readFileSync(resolvedPath);
      const parseOptions = {
        includeMetadata: options.metadata ?? false,
        normalizeWhitespace: true,
      };

      let result;
      if (fileType === 'docx') {
        result = await parseDocx(buffer, parseOptions);
      } else {
        result = await parseXlsx(buffer, parseOptions);
      }

      const output = options.json 
        ? JSON.stringify(result, null, 2)
        : result.text;

      if (options.output) {
        const fs = await import('node:fs/promises');
        await fs.writeFile(options.output, output, 'utf-8');
        console.log(chalk.green(`✓ Output written to ${options.output}`));
      } else {
        console.log(output);
      }

    } catch (error) {
      if (error instanceof UnsupportedFileTypeError) {
        console.error(chalk.red(`❌ ${error.message}`));
        process.exit(1);
      } else if (error instanceof FileReadError) {
        console.error(chalk.red(`❌ ${error.message}`));
        process.exit(2);
      } else if (error instanceof ParseError) {
        console.error(chalk.red(`❌ ${error.message}`));
        process.exit(3);
      } else {
        console.error(chalk.red(`❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`));
        process.exit(4);
      }
    }
  });

program.parse();