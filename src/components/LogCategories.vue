<template>
    <div class="logCategories">
        <p class="lead">
            The following log categories are active on this page.
        </p>
        <div class="justify-content-centermy-1 row">
            <b-form-fieldset horizontal class="col-6">
                <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-form-fieldset>
        </div>
        <b-table
            :items="expandedLogCategories"
            :fields="fields"
            :filter="filter"
        >
            <template slot="category" scope="item">{{item.value}}</template>
            <template slot="logLevel" scope="item">
                <b-dropdown :text="logLevelToDisplayText(item.value)" :variant="logLevelToDropVariant(item.value)">
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, '_')">{{logLevelToDisplayText('_')}}</a>
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, 'DEBUG')">DEBUG</a>
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, 'LOG')">LOG</a>
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, 'INFO')">INFO</a>
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, 'WARN')">WARN</a>
                      <a class="dropdown-item" href="#" @click="setLogLevel(item.item.category, 'ERROR')">ERROR</a>
                </b-dropdown>
            </template>
        </b-table>
    </div>
</template>

<script>
    const validLogLevels = ['DEBUG', 'LOG', 'INFO', 'WARN', 'ERROR'];
    const dropVariantMap = {
        DEBUG: 'primary',
        LOG: 'success',
        INFO: 'info',
        WARN: 'warning',
        ERROR: 'danger'
    };

    function sort(categoryList) {
        categoryList.sort(function (cat1, cat2) {
            return cat1.category.localeCompare(cat2.category);
        });
        return categoryList;
    }

    export default {
        name: 'logCategories',
        props: {
            loadCategoriesFunc: Function,
            setCategoryLogLevelFunc: Function
        },
        data () {
            const data = {
                fields: {
                    category: {label: 'Category', sortable: true},
                    logLevel: {label: 'Log Level'}
                },
                logCategories: [],
                numCategories: 0,
                filter: null
            };

            this.loadCategoriesFunc(function (logCategories) {
                data.logCategories = sort(logCategories.categories);
                data.numCategories = logCategories.count;
            });

            return data;
        },
        methods: {
            logLevelToDisplayText: function (logLevel) {
                if (validLogLevels.indexOf(logLevel) !== -1) {
                    return logLevel;
                } else {
                    return '(unset)';
                }
            },
            logLevelToDropVariant: function (logLevel) {
                return (dropVariantMap[logLevel] || '');
            },
            setLogLevel: function(category, logLevel) {
                try {
                    this.setCategoryLogLevelFunc(category, logLevel);
                } finally {
                    let setPerformed = false;
                    this.logCategories = this.logCategories.map(function (cat) {
                        if (cat.category === category) {
                            cat.logLevel = logLevel;
                            setPerformed = true;
                        }
                        return cat;
                    });
                    if (!setPerformed) {
                        this.logCategories.push({
                            category: category,
                            logLevel: logLevel
                        });
                        sort(this.logCategories);
                    }
                }
            }
        },
        computed: {
            expandedLogCategories: function() {
                const expandedSet = [];
                const expandedCategoryList = [];
                this.logCategories.forEach(function (cat) {
                    let catTokens = cat.category.split('\.');
                    while (catTokens.length > 1) {
                        const subCat = catTokens.join('.');
                        if (expandedCategoryList.indexOf(subCat) === -1) {
                            expandedCategoryList.push(subCat);
                            expandedSet.push({
                                category: subCat,
                                logLevel: (subCat === cat.category ? cat.logLevel : '_')
                            });
                        }
                        catTokens.pop();
                    }
                });
                return sort(expandedSet);
            }
        }
    }
</script>

<style>
    .logCategories {
        padding: 20px;
    }
    .logCategories td:first-child {
        width: 80%;
    }
    .logCategories button {
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        min-width: 70px;
    }
</style>