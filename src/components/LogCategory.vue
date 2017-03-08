<template>
    <li class="collection-item">
        <div class="logCategoryName">{{name}}</div>
        <!--<div class="logCategorylevel input-field">-->
            <!--<v-select name="select">-->
                <!--<option value="_"></option>-->
                <!--<option value="DEBUG">DEBUG</option>-->
                <!--<option value="LOG">LOG</option>-->
                <!--<option value="INFO" selected>INFO</option>-->
                <!--<option value="WARN">WARN</option>-->
                <!--<option value="ERROR">ERROR</option>-->
            <!--</v-select>-->
            <!--<label for="select">Level</label>-->
        <!--</div>-->
        <b-dropdown text="Split Dropdown Button" variant="success" @click="click">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
        </b-dropdown>
    </li>
</template>

<script>
    export default {
        name: 'logCategory',
        props: {
            name: { type: String },
            level: { type: String }
        },
        data () {
//            const messaging = require('../messaging');
            const data = {
                logLevels: [{ id: 'DEBUG', text: 'DEBUG' }]
            };

//            messaging.onMessageFromInspectedPage("log.categories", function (logCategories) {
//                data.logCategories = logCategories.categories;
//                data.numCategories = logCategories.count;
//            });
//            messaging.executeScriptOnInspectedPage("scripts/content-scripts/log-categories.js");

            return data;
        }
    }
</script>
