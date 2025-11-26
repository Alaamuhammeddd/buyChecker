<template>
  <div class="list-item">
    <p class="list-item__label">
      {{ props.label }}
    </p>
    <p>{{ props.price }}</p>
    <p>{{ props.purchasedBy }}</p>
    <p>{{ props.timestamp }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  price: string
  purchasedBy: string
  timestamp?: string
}>()
</script>
<style scoped lang="scss">
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f9f7fa;
  border: 1px solid #e0dfe4;
  border-radius: 6px;
  border-bottom: 2px solid #e0dfe4;
  gap: 20px;
  padding-inline: 10px;
}
</style>
