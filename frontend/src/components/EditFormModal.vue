<template>
  <div v-if="open" class="modal-overlay" @click.self="handleCancel">
    <div class="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
      <form class="form-modal__form" @submit.prevent="handleSubmit">
        <h3 id="form-modal-title" class="form-modal__title">Edit Item</h3>

        <label for="item-name" class="form-modal__label">Item Name</label>
        <input
          v-model="formData.name"
          class="form-modal__input"
          type="text"
          id="item-name"
          name="label"
          placeholder="e.g., Laptop, Chair"
          required
        />

        <label for="item-price" class="form-modal__label">Price (EGP)</label>
        <input
          v-model.number="formData.price"
          class="form-modal__input"
          type="number"
          id="item-price"
          name="price"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />

        <label v-if="purchased" for="item-owner" class="form-modal__label">Purchased By</label>
        <select
          v-if="purchased"
          v-model="formData.boughtBy"
          class="form-modal__input"
          id="item-owner"
          name="purchasedBy"
        >
          <option disabled>Not specified</option>
          <option value="alaa">Alaa</option>
          <option value="mohamed">Mohamed</option>
        </select>

        <div class="form-modal__actions">
          <button type="submit" class="form-modal__submit-btn" :disabled="isSubmitting">
            Update Item
          </button>
          <button
            type="button"
            class="form-modal__cancel-btn"
            @click="handleCancel"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ToBuyItem } from '@/types/toBuyItem'
import type { BoughtItem } from '@/types/boughtItem'

const props = defineProps<{
  open: boolean
  item?: ToBuyItem | BoughtItem
  purchased?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ToBuyItem | BoughtItem]
  cancel: []
}>()

const formData = ref<Partial<ToBuyItem & BoughtItem>>({
  name: '',
  price: 0,
  boughtBy: undefined,
})

const isSubmitting = ref(false)

// Watch for item changes and populate form
watch(
  () => props.item,
  (item) => {
    if (item) {
      // Support items that may use either `name` or `label` keys and BoughtItem shape
      const it = item as ToBuyItem & { label?: string } & Partial<BoughtItem>
      const itemName = (it as any).name ?? (it as any).label ?? ''
      formData.value = {
        _id: item._id,
        name: itemName,
        price: item.price,
        boughtBy: (item as BoughtItem).boughtBy ?? undefined,
        timestamp: item.timestamp,
      }
    } else {
      // Reset form for add mode
      formData.value = {
        name: '',
        price: 0,
        boughtBy: undefined,
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  if (!formData.value.name || (formData.value.price ?? 0) < 0) {
    return
  }

  isSubmitting.value = true
  try {
    emit('submit', {
      _id: formData.value._id,
      name: formData.value.name,
      price: formData.value.price,
      boughtBy: formData.value.boughtBy ?? undefined,
      timestamp: formData.value.timestamp,
    } as ToBuyItem | BoughtItem)
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200; /* above other page content */
  padding: 1.5rem;
}

.form-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(11, 11, 13, 0.4);
  transform-origin: center;
  animation: popIn 160ms ease-out;
  &__form {
    padding: 1.25rem 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  &__title {
    text-align: center;
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 700;
  }
  &__label {
    font-size: 0.9rem;
    color: #444;
  }
  &__input {
    padding: 0.5rem 0.6rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 0.95rem;
  }
  &__actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
  &__submit-btn {
    background: var(--primary-color); /* teal */
    color: #fff;
    border: none;
    padding: 0.55rem 0.9rem;
    border-radius: 8px;
    cursor: pointer;
    letter-spacing: 0.5px;
    word-spacing: 2px;
    font-weight: 600;
  }
  &__cancel-btn {
    letter-spacing: 0.5px;
    background: transparent;
    color: #333;
    border: 1px solid #e5e7eb;
    padding: 0.45rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
  }
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
