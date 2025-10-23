# Playwright BDD Automation Framework

This project is a **Playwright + Cucumber BDD Automation Framework** built using TypeScript. It includes feature files, step definitions, hooks, and multiple reporting options including HTML and advanced multiple-cucumber HTML reports. The framework is CI/CD ready with **GitHub Actions**.

---

## 📦 Project Setup

### 1. Initialize the project

```bash
npm init playwright@latest
npm install --save-dev @cucumber/cucumber ts-node multiple-cucumber-html-reporter mkdirp rimraf
2. Project Structure
project-root/
├─ src/
│  └─ test/
│     ├─ features/       # Feature files
│     └─ steps/          # Step definition files
├─ hooks/
│  └─ hooks.ts           # Cucumber hooks (before/after scenarios)
├─ cucumber.json         # Cucumber configuration
├─ tsconfig.json         # TypeScript configuration
├─ package.json
└─ test-results/         # Reports & screenshots
⚙ Configuration
1. cucumber.json
{
  "default": {
    "paths": ["./src/test/**/features"],
    "require": ["./src/test/steps/**/*.ts", "./src/hooks/hooks.ts"],
    "requireModule": ["ts-node/register"],
    "format": [
      "html:test-results/report/cucumber-report.html",
      "json:test-results/report_advanced/cucumber-report.json"
    ]
  }
}
Note: Cucumber runs JS files, so ts-node is required to compile TypeScript on the fly.

2. tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  }
}
3. VS Code Cucumber Settings (Optional)
"cucumber.features": ["src/test/feature/*.feature"],
"cucumber.glue": ["src/test/steps/*.ts"],
"cucumberautocomplete.steps": ["src/test/steps/**/*.ts"],
"cucumberautocomplete.syncfeatures": true

🧪 Hooks & Screenshots

Add a hooks.ts file to capture screenshots on failure:
After(async function({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const image = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png'
    });
    await this.attach(image, 'image/png');
  }
  await page.close();
  await context.close();
});

📊 Reporting
1. Simple HTML Report
"format": ["html:test-results/report/cucumber-report.html"]

2. Advanced Multiple Cucumber HTML Report

Install:
npm install --save-dev multiple-cucumber-html-reporter

Create reportGenerate.ts:
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

🚀 Running Tests
npm test
This runs pretest (clean), executes Cucumber tests, and generates reports automatically.

⚙ GitHub Actions Workflow
This CI/CD pipeline runs tests and deploys the report to GitHub Pages:
name: Cucumber Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Install Playwright Browsers
        run: npx playwright install

      - name: Run Cucumber Tests
        run: npm test

      - name: Deploy Cucumber Report to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GH_PAT }}
          publish_dir: ./test-results/report_advanced
          publish_branch: gh-pages
After the workflow completes, the advanced report will be viewable in the browser at:
https://<username>.github.io/<repo-name>/

⚡ Notes
Ensure GH_PAT secret is added to your repository (Personal Access Token with repo scope).
Screenshots are automatically attached for failed scenarios.
Reports are generated in the test-results/ folder.
multiple-cucumber-html-reporter provides detailed analytics like scenario duration, tags, and screenshots.
