<template>
    <div id="Panel">
        <LogCategories :loadCategoriesFunc="loadCategoriesFunc"></LogCategories>
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
            }
        }
    }
</script>
