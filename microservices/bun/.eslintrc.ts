// .eslintrc.ts
import { Linter } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const config: Linter.Config = {
	env: {
		browser: false,
		node: true,
		es2021: true,
	},
	parser: tsParser,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		// Общие правила
		'no-console': 'warn',
		'curly': ['error', 'all'],
		'eqeqeq': ['error', 'always'],

		// Форматирование
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				trailingComma: 'es5',
			},
		],

		// TypeScript
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-non-null-assertion': 'off',

		// Импорты
		'import/order': [
			'warn',
			{
				groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
				'newlines-between': 'always',
				alphabetize: { order: 'asc', caseInsensitive: true },
			},
		],
		'import/no-unresolved': 'off', // чтобы не ругался на алиасы "@/"
	},
	ignorePatterns: ['node_modules', 'dist', 'build', '*.js', '*.cjs'],
};

export default config;
