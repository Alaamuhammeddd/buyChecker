<template>
  <div class="tobuy-list">
    <CardView :label="`To Buy List (${store.toBuyItems.length})`">
      <div v-if="store.loading" class="loading">Loading...</div>
      <div v-else-if="store.toBuyItems.length === 0" class="empty">
        <p>No items to buy yet!</p>
      </div>
      <div v-else class="tobuy-list__items">
        <ListItems
          v-for="item in store.toBuyItems"
          :key="item._id"
          :label="item.name"
          :price="`$${item.price.toFixed(2)}`"
          :purchasedBy="'-'"
          :timestamp="formatDate(item.createdAt)"
          @edit="handleEdit(item._id)"
          @delete="handleDelete(item._id)"
        />
      </div>
    </CardView>
  </div>
</template>

<script setup lang="ts">
import { useWeddingStore } from '@/stores/weddingStore'
import { onMounted } from 'vue'
import CardView from '@/components/CardView.vue'
import ListItems from './ListItems.vue'

const store = useWeddingStore()

onMounted(async () => {
  await store.fetchToBuyItems()
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const handleEdit = (itemId: string) => {
  console.log('Edit item:', itemId)
}

const handleDelete = async (itemId: string) => {
  if (confirm('Are you sure you want to delete this item?')) {
    await store.deleteToBuyItem(itemId)
  }
}
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

.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.empty {
  text-align: center;
  padding: 1rem;
  color: #999;
}
</style>
