<template>
  <div class="bought-list">
    <CardView :label="'Bought List'">
      <div class="bought-list__items">
        <ListItems label="Bread" price="$3.00" purchasedBy="Bob" :timestamp="'2025 - 09 - 10'" />
      </div>
    </CardView>
  </div>
</template>

<script setup lang="ts">
import CardView from './CardView.vue'
import ListItems from './ListItems.vue'
</script>
<style scoped lang="scss">
.bought-list {
  &__items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
}
</style>
