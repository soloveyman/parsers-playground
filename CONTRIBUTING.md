# Contributing to Parsers Playground

Thank you for your interest in contributing to Parsers Playground! This document provides guidelines for contributing to this project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/parsers-playground.git
   cd parsers-playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Build the project**
   ```bash
   npm run build
   ```

## Code Style

- Follow the existing code style (ESLint + Prettier)
- Use TypeScript strict mode
- Write tests for new features
- Use meaningful commit messages

## Testing

- Write unit tests for new functionality
- Ensure all tests pass: `npm test`
- Maintain test coverage above 80%
- Add integration tests for new parsers

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Run linting and fix any issues
6. Submit a pull request with a clear description

## Adding New Parsers

1. Create a new parser file in `src/parsers/`
2. Export the parser from `src/parsers/index.ts`
3. Add tests in `src/tests/`
4. Update the CLI to support the new file type
5. Update documentation

## Reporting Issues

- Use the bug report template
- Provide clear steps to reproduce
- Include environment information
- Add relevant error messages

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
