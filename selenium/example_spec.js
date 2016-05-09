var selenium = require('selenium-webdriver')
var chai     = require('chai')
var expect   = chai.expect
chai.use(require('chai-as-promised'))

// ----------------SauceLabs Specific----------------
var sauceLabsUsername = process.env.SAUCE_USERNAME
var sauceLabsAccessKey = process.env.SAUCE_ACCESS_KEY

var sauceLabsCapabilities = {
  'browserName': 'internet explorer',
  'version': '8.0',
  'platform': 'Windows XP',
  'username': sauceLabsUsername,
  'accessKey': sauceLabsAccessKey
}

var sauceLabsServer = "http://" + sauceLabsUsername + ":" + sauceLabsAccessKey + "@ondemand.saucelabs.com:80/wd/hub"

// -----------BrowserStack Specific----------------------
var browserStackUsername = $BROWSER_STACK_USERNAME
var browserStackAccessKey = $BROWSER_STACK_ACCESS_KEY

var browserStackCapabilities = {
  'browserName' : 'chrome',
  'os' : 'Windows',
  'os_version' : 'XP',
  'browserstack.user': browserStackUsername,
  'browserstack.key': browserStackAccessKey,
  'browserstack.debug': true,
  'browserstack.local': true
}

var browserStackServer = 'http://hub.browserstack.com/wd/hub'

// -----------------------------------------------------

var driver = new selenium.Builder()
  .withCapabilities(browserStackCapabilities)
  .usingServer(browserStackServer)
  .build()
driver.getWindowHandle()

driver.get('http://localhost:8080')
expect(driver.getTitle()).to.eventually.contain('Cypress.io: Kitchen Sink')

driver.get('https://example.cypress.io/commands/querying')

// We can get DOM elements by id
var text = driver.findElement({id: 'query-btn'}).getText()
expect(text).to.eventually.equal('Button')

// We can get DOM elements by class
text = driver.findElement({css: '.query-btn'}).getText()
expect(text).to.eventually.equal('Button')

// we can CSS selectors just like jQuery
// text = driver.findElement({css: '#querying .well>button:first'}).getText()
// expect(text).to.eventually.equal('Button')

driver.quit()
