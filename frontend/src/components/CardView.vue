<template>
  <div class="card">
    <label class="card__label"
      ><em>
        {{ props.label }}
      </em>
    </label>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<style scoped lang="scss">
.card {
  background-color: #ece8ee;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;

  &__label {
    display: flex;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
    color: var(--primary-color);
    border-bottom: 2px solid #d6cfd9;
    padding-block-end: 6px;
  }
}
</style>
