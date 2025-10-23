const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
    jsonDir: path.join(__dirname, '..', '..', 'test-results'), // folder with cucumber JSON output
    reportPath: path.join(__dirname, '..', '..', 'test-results', 'report_advanced'),
    metadata: {
        browser: {
            name: 'chromium',    // Playwright default browser
            version: 'latest'    // version doesn’t need to match exactly
        },
        device: 'GitHub Actions runner',
        platform: {
            name: 'ubuntu',
            version: process.platform // optional, can leave as '22.04'
        }
    },
    customData: {
        title: 'Project Info',
        data: [
            { label: 'Project', value: 'Project 2' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Cycle', value: 'GitHub Actions CI' },
        ]
    }
});
