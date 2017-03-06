<template>
    <div id="logCategories">
        Number of logging categories = {{numCategories}}
    </div>
</template>

<script>
    export default {
        name: 'logCategories',
        data () {
            const messaging = require('../messaging');
            const data = {
                logCategories: [],
                numCategories: 0
            };

            messaging.onMessageFromInspectedPage("log.categories", function (logCategories) {
                data.logCategories = logCategories.categories;
                data.numCategories = logCategories.count;
            });
            messaging.executeScriptOnInspectedPage("scripts/content-scripts/log-categories.js");

            return data;
        }
    }
</script>
