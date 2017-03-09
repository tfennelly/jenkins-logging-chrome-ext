<template>
    <div id="Panel">
        <LogCategories :loadCategoriesFunc="loadCategoriesFunc" :setCategoryLogLevelFunc="setCategoryLogLevelFunc"></LogCategories>
    </div>
</template>

<script>
    import messaging from './messaging';
    import LogCategories from './components/LogCategories.vue'

    export default {
        name: 'Panel',
        components: {
            LogCategories
        },
        methods: {
            loadCategoriesFunc: function(callback) {
                messaging.onMessageFromInspectedPage("log.categories", callback);
                messaging.executeScriptOnInspectedPage("scripts/content-scripts/log-categories.js");
            },
            setCategoryLogLevelFunc: function(category, logLevel) {
                messaging.injectScriptOnInspectedPage(`localStorage.setItem('jenkins-instance/logging/categories:${category}', '${logLevel}')`);
            }
        }
    }
</script>
