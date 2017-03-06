<template>
    <div id="Panel">
        Number of log categories {{logCategories.length}}
    </div>
</template>

<script>
    import LogCategories from './components/LogCategories.vue'

    export default {
        name: 'Panel',
        components: {
            LogCategories
        },
        data: {
            logCategories: logCategories
        }
    }
</script>
