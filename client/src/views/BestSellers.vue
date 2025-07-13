<script setup lang="ts">
import type { Book, List } from '@/components/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const listName = useRoute().params.list_name_encoded

const list = ref<List | null>(null)
const errorMessage = ref<string | null>(null)

onMounted(() => {
  fetch('/api/books/lists/' + listName)
    .then((res) => res.json())
    .then((data) => {
      errorMessage.value = null
      list.value = data;
    })
    .catch(() => {
      errorMessage.value = 'Failed to fetch best sellers lists.'
    })
})
</script>

<template>
  <main>
    <h2>Best Sellers - {{ list?.display_name }}</h2>
    <ul>
      <li v-for="book in list?.books" :key="book.book_uri">
        <h3>{{ book.title }}</h3>
        <p>Author: {{ book.author }}</p>
        <p>Description: {{ book.description }}</p>
        <img :src="book.book_image" alt="Book cover" />
      </li>
    </ul>
  </main>
</template>
