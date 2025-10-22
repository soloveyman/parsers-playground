// Script to create a test DOCX file
import { writeFileSync } from 'node:fs';
import * as XLSX from 'xlsx';

// Create a simple XLSX file first (easier to create programmatically)
const workbook = XLSX.utils.book_new();
const data = [
  ['Document Title', 'Test Document'],
  ['Author', 'Parser Test'],
  ['Date', new Date().toLocaleDateString()],
  ['', ''],
  ['Content', 'This is a test document for the parsers playground.'],
  ['', 'It contains multiple lines of text.'],
  ['', 'Perfect for testing the CLI functionality.'],
  ['', ''],
  ['Features', ''],
  ['- Text extraction', 'Working'],
  ['- Metadata support', 'Working'],
  ['- JSON output', 'Working'],
  ['- Error handling', 'Working']
];

const worksheet = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Document');

const options = { type: 'buffer', bookType: 'xlsx' };
const buffer = XLSX.write(workbook, options);

writeFileSync('test-document.xlsx', buffer);
console.log('✅ Created test-document.xlsx');
