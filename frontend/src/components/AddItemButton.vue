<script setup lang="ts">
const emit = defineEmits(['addItem'])
const handleAdd = () => {
  emit('addItem')
}
</script>
<template>
  <button class="add-btn" @click="handleAdd">Add +</button>
</template>

<style scoped>
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  background: #06b6d4; /* teal */
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}
</style>
