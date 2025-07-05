# 🚀 Playwright Test Automation Framework (TypeScript)

This repository contains an end-to-end UI and API test automation framework using **Playwright** with **TypeScript**, designed to test modern web applications efficiently. It supports both local and CI/CD test execution using **GitHub Actions**, with real-time test result notifications sent to a **Slack** channel.

---

## 🧰 Features

- ✅ UI Automation with Playwright
- ✅ API Testing support
- ✅ Page Object Model (POM) Design pattern with Data Driven testing approach
- ✅ Configurable test environment support
- ✅ Test results reporting (HTML + JSON)
- ✅ CI/CD setup via GitHub Actions
- ✅ Slack integration for test execution result alerts from CI-CD pipeline

---

## 🔧 Prerequisites

Ensure you have the following installed before getting started:

- [Node.js (v18+)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- [Playwright Test for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

> **Note:** SECRET_KEY used to both encrypt and decrypt sensitive test data. This key must be:

> - Currently SECRET_KEY used for UI tests only
> - Added into .env file for local execution
> - Added as a GitHub secret when running in CI/CD pipeline

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amarendra91/PlaywrightFramework
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Run all tests locally(UI and API)

```bash
npx playwright test
```

> Test results will be available in the `playwright-report` folder.

---

## 🧲 Folder Structure

```
.
├── tests/               # Test specs (UI + API)
├── pages/               # Page objects
├── utils/               # Utility functions (e.g., encryption, helpers)
├── fixtures/            # Test data and setup
├── playwright.config.ts # Playwright configuration
├── .github/workflows/   # GitHub Action CI/CD workflow
```

---

## ⚙️ Configuration

Update `playwright.config.ts` with the appropriate base URLs, environment settings, timeout, and test retries if needed.

For environment-specific settings, use `.env` files or environment variables.

---

## 🔪 GitHub Actions CI/CD

Tests are automatically triggered via GitHub Actions on every push to `main`` branch.

- Installs dependencies
- Runs Playwright tests
- Uploads HTML report as an artifact
- Sends a summary of results to Slack

> Sample Workflow: `.github/workflows/playwright_ui_test_chrome.yml`

### ✅ Sample Test Report in Slack

Slack message includes:

- Test suite title
- Test run number
- Total, passed, failed, skipped, flaky counts
- Mention a user if failures occur
- Direct link to HTML report

**Example Screenshot:**

**_All Tests Passed_**
![Test Execution Summary](image1.png)

**_Any Test(s) failed_**
![Test Execution Summary](image2.png)

---

## 📄 Artifacts and Reports

After each GitHub Actions run:

- HTML report is uploaded as an artifact
- JSON report (`ctrf/*.json`) is used to extract stats
- Slack message is sent using incoming webhook

---

## 📌 Slack Integration Setup (Optional)

1. Create an incoming webhook in your Slack workspace.
2. Add the webhook URL as a **GitHub secret** (e.g., `SLACK_WEBHOOK_URL`).
3. Customize message content in workflow based on `ctrf` JSON output or `test-results.json`.

---
