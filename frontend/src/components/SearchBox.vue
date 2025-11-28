<template>
  <div class="search-box">
    <input
      v-model="searchQuery"
      type="text"
      class="search-box__input"
      placeholder="Search items by name..."
      @input="handleSearch"
    />
    <button
      v-if="searchQuery"
      class="search-box__clear-btn"
      @click="clearSearch"
      title="Clear search"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  search: [query: string]
}>()

const handleSearch = () => {
  emit('search', searchQuery.value.toLowerCase())
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;

  &__input {
    flex: 1;
    padding: 0.6rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(26, 188, 156, 0.1);
    }

    &::placeholder {
      color: #aaa;
    }
  }

  &__clear-btn {
    padding: 0.5rem 0.8rem;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #666;
    transition: all 0.2s ease;

    &:hover {
      background: #f5f5f5;
      color: #333;
    }
  }
}
</style>
