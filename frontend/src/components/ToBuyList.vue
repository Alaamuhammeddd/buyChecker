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
          :name="item.name"
          :purchased="false"
          :price="`${item.price.toFixed(2)} EGP`"
          :purchasedBy="'-'"
          :timestamp="formatDate(item.createdAt)"
          @edit="handleEdit(item)"
          @buy="handleBuy(item)"
          @delete="handleDelete(item._id)"
        />
      </div>
    </CardView>
  </div>
</template>

<script setup lang="ts">
import { useWeddingStore } from '@/stores/weddingStore'
import { onMounted, defineEmits } from 'vue'
import CardView from '@/components/CardView.vue'
import ListItems from './ListItems.vue'
import type { ToBuyItem } from '@/types/toBuyItem'

const store = useWeddingStore()

const emit = defineEmits<{
  edit: [item: ToBuyItem]
  buy: [item: ToBuyItem]
}>()

onMounted(async () => {
  await store.fetchToBuyItems()
})

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

const handleEdit = (item: ToBuyItem) => {
  emit('edit', item)
}
const handleBuy = (item: ToBuyItem) => {
  emit('buy', item)
}
const handleDelete = async (itemId: string | undefined) => {
  if (!itemId) return
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
