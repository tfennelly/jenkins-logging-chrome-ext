<template>
  <div id="Panel">
    <LogCategories></LogCategories>
  </div>
</template>

<script>
import LogCategories from './components/LogCategories.vue'

export default {
  name: 'Panel',
  components: {
      LogCategories
  }
}
</script>
