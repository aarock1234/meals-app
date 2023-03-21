import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	// transpile typescript
	preset: 'ts-jest',
	// test environment
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.(css|less)$': '<rootDir>/tests/css.ts',
	},
};

export default config;
// App.test.tsx
