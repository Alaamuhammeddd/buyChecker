<template>
  <div class="list-item">
    <p class="list-item__label">
      {{ props.name }}
    </p>
    <p class="list-item__category">
      {{ props.category ?? '-' }}
    </p>
    <p class="list-item__price">{{ priceDisplay }}</p>
    <p class="list-item__purchased-by" v-if="purchased">{{ purchasedByDisplay }}</p>
    <p class="list-item__timestamp">{{ props.timestamp ?? '-' }}</p>
    <button type="button" class="list-item__edit" title="Edit item" @click="handleEdit">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button type="button" class="list-item__delete" title="Delete item" @click="handleDelete">
      <i class="fa-regular fa-trash-can"></i>
    </button>
    <button
      v-if="!purchased"
      type="button"
      class="list-item__check"
      title="Mark as bought"
      @click="handleBuy"
    >
      <i class="fa-regular fa-check-circle"></i>
    </button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  purchased?: boolean
  name: string
  price: string | number
  category?: string
  purchasedBy?: string
  timestamp?: string
}>()

const emit = defineEmits(['edit', 'delete', 'buy'])
const isEditOpen = ref(false)
const isBuyOpen = ref(false)
const handleEdit = () => {
  isEditOpen.value = true
  emit('edit')
}
const handleDelete = () => {
  emit('delete')
}
const handleBuy = () => {
  isBuyOpen.value = true
  emit('buy')
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
  flex-wrap: wrap;
  word-break: break-word;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 10px 8px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 8px 6px;
  }
}

.list-item__label {
  margin: 0;
  font-weight: 600;
  color: #333;
  flex: 1;
  min-width: 100%;

  @media (max-width: 768px) {
    font-size: 1rem;
    min-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
}

.list-item__price {
  margin: 0;
  min-width: 80px;
  text-align: right;
  font-weight: 500;
  color: #511f8d;

  @media (max-width: 768px) {
    min-width: auto;
    text-align: left;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
}

.list-item__purchased-by {
  margin: 0;
  min-width: 100px;
  color: #666;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    min-width: auto;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
}

.list-item__timestamp {
  margin: 0;
  min-width: 120px;
  color: #999;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    min-width: auto;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
    font-size: 0.85rem;
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

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
    font-size: 0.85rem;
  }
}
.list-item__check {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 150ms ease;
  color: #4caf50;
  font-size: 1rem;
  &:hover {
    background: var(--background-light);
    color: #90e07a;
  }
}
</style>
