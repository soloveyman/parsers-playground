# Parsers Playground

A robust, production-ready playground for developing and testing document parsers (DOCX/XLSX). Built with TypeScript, featuring comprehensive testing, CLI interface, and extensible architecture.

## Features

- **Document Parsers**: Extract text from DOCX and XLSX files
- **TypeScript**: Full type safety with strict configuration
- **CLI Interface**: Command-line tool with multiple output formats
- **Comprehensive Testing**: Unit tests, integration tests, and coverage reporting
- **Error Handling**: Robust error handling with custom error types
- **Metadata Support**: Optional parsing metadata and file information
- **Extensible**: Easy to add new parser types

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Use CLI
npm run cli -- path/to/document.docx
```

## CLI Usage

```bash
# Basic usage
npm run cli -- document.docx

# Include metadata
npm run cli -- document.docx --metadata

# Output as JSON
npm run cli -- document.xlsx --json

# Save to file
npm run cli -- document.docx --output result.txt

# Help
npm run cli -- --help
```

## Development

```bash
# Watch mode for development
npm run dev

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
src/
├── parsers/           # Parser implementations
│   ├── docx-parser.ts
│   ├── xlsx-parser.ts
│   └── index.ts
├── tests/             # Test files
│   ├── xlsx-parser.test.ts
│   ├── docx-parser.int.test.ts
│   └── utils.test.ts
├── types.ts           # Shared type definitions
├── utils.ts           # Shared utilities
└── cli.ts            # CLI interface
```

## API

### Parsers

```typescript
import { parseDocx, parseXlsx } from './parsers';

// Parse DOCX
const result = await parseDocx(buffer, {
  includeMetadata: true,
  normalizeWhitespace: true
});

// Parse XLSX
const result = await parseXlsx(buffer, {
  includeMetadata: true,
  normalizeWhitespace: true
});
```

### Types

```typescript
interface ParseResult {
  readonly text: string;
  readonly metadata?: ParseMetadata;
}

interface ParseMetadata {
  readonly fileName?: string;
  readonly fileSize?: number;
  readonly parsedAt: Date;
  readonly parserVersion: string;
}
```

## Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Test individual functions and utilities
- **Integration Tests**: Test with real document files
- **Property-based Tests**: Fuzz testing for critical functions
- **Coverage Reporting**: 80% coverage threshold

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- xlsx-parser.test.ts
```

## Error Handling

The project includes custom error types for better error handling:

- `UnsupportedFileTypeError`: For unsupported file types
- `FileReadError`: For file reading issues
- `ParseError`: For parsing failures

## Contributing

1. Follow the existing code style (ESLint + Prettier)
2. Write tests for new features
3. Ensure all tests pass
4. Update documentation as needed

## License

MIT