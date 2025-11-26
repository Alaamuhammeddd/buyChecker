<template>
  <div class="tobuy-list">
    <CardView :label="'To Buy List'">
      <div class="tobuy-list__items">
        <ListItems label="Milk" price="$2.50" purchasedBy="Alice" :timestamp="'2025 - 09 - 10'" />
      </div>
    </CardView>
  </div>
</template>
<script setup lang="ts">
import CardView from '@/components/CardView.vue'
import ListItems from './ListItems.vue'
</script>
<style scoped lang="scss">
.tobuy-list {
  &__items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
}
</style>
