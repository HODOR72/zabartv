module.exports = {
	collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	moduleNameMapper: {
		'^@/components(.*)$': '<rootDir>/src/components/$1',
		'^@/icons': '<rootDir>/src/components/Icons',
		'^@/UI(.*)$': '<rootDir>/src/components/UI/$1',

		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		'^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/e2e/'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
