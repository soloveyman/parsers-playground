// Vitest type declarations

declare global {
  namespace Vi {
    interface Assertion<T = unknown> {
      toBe(expected: T): void;
      toEqual(expected: T): void;
      toContain(expected: unknown): void;
      toMatch(expected: RegExp | string): void;
      toBeDefined(): void;
      toBeUndefined(): void;
      toBeNull(): void;
      toBeTruthy(): void;
      toBeFalsy(): void;
      toBeGreaterThan(expected: number): void;
      toBeLessThan(expected: number): void;
      toBeInstanceOf(expected: unknown): void;
      toThrow(expected?: string | RegExp | Error): void;
      rejects: {
        toThrow(expected?: string | RegExp | Error): Promise<void>;
      };
    }
  }
  
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void | Promise<void>) => void;
  const expect: <T>(actual: T) => Vi.Assertion<T>;
  const beforeEach: (fn: () => void | Promise<void>) => void;
  const afterEach: (fn: () => void | Promise<void>) => void;
  const beforeAll: (fn: () => void | Promise<void>) => void;
  const afterAll: (fn: () => void | Promise<void>) => void;
}

export {};
