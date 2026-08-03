<template>
  <button class="filter-btn" type="button" @click="$emit('click')">
    Filter
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<style scoped lang="scss">
.filter-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
</style>
