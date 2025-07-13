<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Trendy Books</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
