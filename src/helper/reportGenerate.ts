const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
    jsonDir: path.join(__dirname, '..', '..', 'test-results', 'report_advanced'),
    reportPath: path.join(__dirname, '..', '..', 'test-results', 'report_advanced'),
    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: process.platform
        }
    },
    customData: {
        title: 'Project Info',
        data: [
            { label: 'Project', value: 'Playwright BDD POM Framework' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Cycle', value: 'Automated Testing' },
            { label: 'Execution Time', value: new Date().toLocaleString() }
        ]
    }
});

console.log('✅ Advanced HTML report generated successfully!');