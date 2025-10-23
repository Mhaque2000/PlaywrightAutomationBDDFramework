const report = require('multiple-cucumber-html-reporter');
 
report.generate({
    jsonDir: './test-results/report_advanced/',
    reportPath: './test-results/report_advanced/',
    metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    }
});