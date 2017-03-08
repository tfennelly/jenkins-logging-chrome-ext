<template>
    <b-table
        :items="logCategories"
        :fields="fields"
        pagination
        :perPage="10"
    >
        <template slot="category" scope="item">{{item.value}}</template>
        <template slot="logLevel" scope="item">{{item.value}}</template>
    </b-table>
</template>

<script>
    import LogCategory from './LogCategory.vue'

    export default {
        name: 'logCategories',
        components: {
            LogCategory
        },
        data () {
            const messaging = require('../messaging');
            const data = {
                fields: {
                    category: {label: 'Category', sortable: true},
                    logLevel: {label: 'Log Level'}
                },
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
