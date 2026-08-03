<template>
  <div class="select-dropdown" ref="root">
    <button
      type="button"
      class="select-dropdown__trigger"
      :class="{ 'select-dropdown__trigger--open': isOpen }"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.esc.prevent="close"
    >
      <span class="select-dropdown__label">
        {{ displayLabel }}
      </span>
      <span class="select-dropdown__chevron">▾</span>
    </button>

    <div v-if="isOpen" class="select-dropdown__menu" role="listbox">
      <button
        v-for="option in normalizedOptions"
        :key="option.value"
        type="button"
        class="select-dropdown__option"
        :class="{ 'select-dropdown__option--selected': option.value === modelValue }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
  includeNew?: boolean
  newLabel?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const normalizedOptions = computed(() => {
  const base = props.options.map((o) => ({ value: o, label: o }))
  if (props.includeNew) {
    base.push({ value: '__new__', label: props.newLabel || 'Add new option…' })
  }
  return base
})

const displayLabel = computed(() => {
  if (!props.modelValue) return props.placeholder || 'Select an option'
  const match = normalizedOptions.value.find((o) => o.value === props.modelValue)
  return match ? match.label : props.modelValue
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const select = (value: string) => {
  emit('update:modelValue', value)
  close()
}

const handleClickOutside = (event: MouseEvent) => {
  const el = root.value
  if (!el) return
  if (!el.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.select-dropdown {
  position: relative;
}

.select-dropdown__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.select-dropdown__trigger--open {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.25);
}

.select-dropdown__label {
  color: #111827;
  text-align: left;
}

.select-dropdown__chevron {
  color: #6b7280;
  font-size: 0.85rem;
}

.select-dropdown__menu {
  position: absolute;
  inset-inline: 0;
  margin-top: 0.4rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.12);
  padding: 0.35rem;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
}

.select-dropdown__option {
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #0f172a;
  transition: background 0.15s ease, transform 0.05s ease;
}

.select-dropdown__option:hover {
  background: #e6f6ff;
}

.select-dropdown__option:active {
  transform: scale(0.99);
}

.select-dropdown__option--selected {
  background: #dff3ff;
  font-weight: 600;
}
</style>
