<template>
  <div class="list-item">
    <p class="list-item__label">
      {{ props.label }}
    </p>
  <p class="list-item__price">{{ priceDisplay }}</p>
  <p class="list-item__purchased-by">{{ purchasedByDisplay }}</p>
  <p class="list-item__timestamp">{{ props.timestamp ?? '-' }}</p>
    <button class="list-item__edit" title="Edit item" @click="handleEdit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="list-item__delete" title="Delete item" @click="handleDelete">
      <i class="fa-regular fa-trash-can"></i>
    </button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  price: string | number
  purchasedBy?: string
  timestamp?: string
}>()

const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => {
  emit('edit')
}
const handleDelete = () => {
  emit('delete')
}

const purchasedByDisplay = computed(() => {
  const v = props.purchasedBy || ''
  if (!v) return '-'
  return v.charAt(0).toUpperCase() + v.slice(1)
})

const priceDisplay = computed(() => {
  if (typeof props.price === 'number') return `$${props.price.toFixed(2)}`
  return (props.price as string) ?? '-'
})
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f7fa;
  border: 1px solid #e0dfe4;
  border-radius: 6px;
  border-bottom: 2px solid #e0dfe4;
  gap: 20px;
  padding: 12px 10px;
  transition: all 200ms ease;
}

.list-item__label {
  margin: 0;
  font-weight: 600;
  color: #333;
}

.list-item__price {
  margin: 0;
  min-width: 80px;
  text-align: right;
  font-weight: 500;
  color: #511f8d;
}

.list-item__purchased-by {
  margin: 0;
  min-width: 100px;
  color: #666;
  font-size: 0.9rem;
}

.list-item__timestamp {
  margin: 0;
  min-width: 120px;
  color: #999;
  font-size: 0.85rem;
}

.list-item__edit {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 150ms ease;
  color: #666;
  font-size: 1rem;

  &:hover {
    background: var(--background-light);
    color: var(--primary-color);
  }

  &:active {
    transform: scale(0.95);
  }
}
.list-item__delete {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 150ms ease;
  color: rgba(216, 20, 20, 0.659);
  font-size: 1rem;
  &:hover {
    background: var(--background-light);
    color: rgba(221, 141, 141, 0.659);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
