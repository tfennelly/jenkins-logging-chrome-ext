import Vue from 'vue'
import Panel from './Panel.vue'

const messaging = require('./messaging');

messaging.onMessageFromInspectedPage("log.categories", function (logCategories) {
    new Vue({ // eslint-disable-line no-new
        el: '#panel',
        render: (h) => h(Panel),
        data: {
            logCategories: logCategories
        }
    });
});
messaging.executeScriptOnInspectedPage("scripts/content-scripts/log-categories.js");