<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type List } from './types'

const lists = ref<List[]>([])
const errorMessage = ref<string | null>(null)

onMounted(() => {
  fetch('/api/books')
    .then((res) => res.json())
    .then((res) => {
      errorMessage.value = null
      lists.value = res.results.lists
    })
    .catch(() => {
      errorMessage.value = 'Failed to fetch best sellers lists.'
    })
})
</script>
<template>
  <h2>Categories</h2>
  <span v-if="errorMessage">{{ errorMessage }}</span>
  <ul>
    <li v-for="list in lists" :key="list.list_name_encoded">
      <RouterLink :to="`/lists/${list.list_name_encoded}`">
        {{ list.display_name }}
      </RouterLink>
    </li>
  </ul>
</template>
