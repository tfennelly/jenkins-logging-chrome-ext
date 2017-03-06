// Can use
// chrome.devtools.*
// chrome.extension.*

const messaging = require('./messaging');

messaging.onMessageFromInspectedPage("log.categories.count", function (logCategories) {
  // Only show the "Jenkins Logging" panel if jenkins logging
  // is in use on the page.
  if (logCategories.count > 0) {
    chrome.devtools.panels.create('Jenkins Logging', '../images/icon-16.png', '../panel.html', function (panel) {});
  }
});
messaging.executeScriptOnInspectedPage("scripts/content-scripts/log-categories-count.js");