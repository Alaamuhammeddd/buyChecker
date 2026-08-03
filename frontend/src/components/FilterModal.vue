<template>
  <div v-if="open" class="modal-overlay" @click.self="handleCancel">
    <div class="filter-modal" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
      <div class="filter-modal__header">
        <h3 id="filter-modal-title" class="filter-modal__title">Filters</h3>
        <button type="button" class="filter-modal__close" @click="handleCancel">×</button>
      </div>

      <div class="filter-modal__body">
        <div class="filter-modal__group">
          <label class="filter-modal__label">Category</label>
          <SelectDropdown
            v-model="localCategory"
            :options="categories"
            placeholder="All categories"
          />
        </div>
        <div class="filter-modal__group">
          <label class="filter-modal__label">Purchased By</label>
          <select v-model="localBoughtBy" class="filter-modal__select">
            <option value="">All</option>
            <option value="alaa">Alaa</option>
            <option value="mohamed">Mohamed</option>
          </select>
        </div>
      </div>

      <div class="filter-modal__actions">
        <button type="button" class="filter-modal__clear" @click="handleClear">Clear</button>
        <button type="button" class="filter-modal__apply" @click="handleApply">Apply</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectDropdown from '@/components/SelectDropdown.vue'

const props = defineProps<{
  open: boolean
  categories: string[]
  category: string
  boughtBy: '' | 'alaa' | 'mohamed'
}>()

const emit = defineEmits<{
  apply: [data: { category: string; boughtBy: '' | 'alaa' | 'mohamed' }]
  clear: []
  cancel: []
}>()

const localCategory = ref('')
const localBoughtBy = ref<'' | 'alaa' | 'mohamed'>('')

watch(
  () => props.open,
  (open) => {
    if (open) {
      localCategory.value = props.category || ''
      localBoughtBy.value = props.boughtBy || ''
    }
  },
  { immediate: true },
)

const handleApply = () => {
  emit('apply', { category: localCategory.value, boughtBy: localBoughtBy.value })
}

const handleClear = () => {
  localCategory.value = ''
  localBoughtBy.value = ''
  emit('clear')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 1.5rem;
}

.filter-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(11, 11, 13, 0.4);
  animation: popIn 160ms ease-out;
  padding: 1rem 1.1rem 1.25rem;
}

.filter-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.filter-modal__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.filter-modal__close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  color: #666;
}

.filter-modal__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-modal__group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filter-modal__label {
  font-size: 0.9rem;
  color: #444;
}

.filter-modal__select {
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 0.95rem;
}

.filter-modal__actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.filter-modal__clear {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #333;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
}

.filter-modal__apply {
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  font-weight: 600;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
