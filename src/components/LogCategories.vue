<template>
    <div>
        <p class="lead">
            The following log categories are active on this page.
        </p>
        <div class="justify-content-centermy-1 row">
            <b-form-fieldset horizontal class="col-6">
                <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-form-fieldset>
        </div>
        <b-table
            :items="logCategories"
            :fields="fields"
            :filter="filter"
        >
            <template slot="category" scope="item">{{item.value}}</template>
            <template slot="logLevel" scope="item">{{item.value}}</template>
        </b-table>
    </div>
</template>

<script>
    export default {
        name: 'logCategories',
        data () {
            const messaging = require('../messaging');
            const data = {
                fields: {
                    category: {label: 'Category', sortable: true},
                    logLevel: {label: 'Log Level'}
                },
                logCategories: [],
                numCategories: 0,
                filter: null
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
