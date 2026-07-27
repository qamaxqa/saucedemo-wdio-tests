export const config = {
    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],

    maxInstances: 2,

    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--window-size=1440,1000']
            }
        },
        {
            maxInstances: 1,
            browserName: 'msedge',
            'ms:edgeOptions': {
                args: ['--window-size=1440,1000']
            }
        }
    ],

    logLevel: 'warn',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 2,

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            useCucumberStepReporter: true,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/**/*.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: true,
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    beforeScenario: async function () {
        await browser.deleteCookies();
    },

    afterScenario: async function (world, result) {
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    }
};
