module.exports = {
    coverageDirectory: './coverage',
    collectCoverageFrom: ['./src/**/*.ts'],
    coverageReporters: ['cobertura', 'text'],
    preset: 'ts-jest',
    rootDir: './',
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                filename: 'report.html',
                expand: true,
                openReport: true,
                publicPath: 'test_reports'
            }
        ]
    ],
    testEnvironment: 'node',
    testMatch: ['**/(*.)test.[jt]s?(x)'],
    globals: {
        skipBabel: true,
    }
};
