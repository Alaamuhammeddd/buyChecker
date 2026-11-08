<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeddingStore } from '@/stores/weddingStore'

const store = useWeddingStore()

const { selectedCategory } = storeToRefs(store)

const categories = ref<string[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    categories.value = await store.getCategories()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="category-filter">
    <select id="category" v-model="selectedCategory" :disabled="loading">
      <option value="all">All Categories</option>

      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 8px;
  width: 220px;
}

.category-filter label {
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

.category-filter select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.category-filter select:focus {
  border-color: #8b5cf6;
}
</style>
