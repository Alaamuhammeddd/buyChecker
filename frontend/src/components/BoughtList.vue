<template>
  <div class="bought-list">
    <CardView :label="`Bought List (${store.boughtItems.length})`">
      <div v-if="store.loading" class="loading">Loading...</div>
      <div v-else-if="store.boughtItems.length === 0" class="empty">
        <p>No items bought yet!</p>
      </div>
      <div v-else>
        <!-- Bought by Alaa -->
        <div v-if="store.boughtByAlaa.length > 0" class="buyer-section">
          <h4 class="buyer-title">Bought by Alaa ({{ store.boughtByAlaa.length }})</h4>
          <div class="bought-list__items">
            <ListItems
              v-for="item in store.boughtByAlaa"
              :key="item._id"
              :label="item.name"
              :price="`$${item.price.toFixed(2)}`"
              :purchasedBy="item.boughtBy"
              :timestamp="formatDate(item.createdAt)"
              @edit="handleEdit(item._id)"
              @delete="handleDelete(item._id)"
            />
          </div>
        </div>

        <!-- Bought by Mohamed -->
        <div v-if="store.boughtByMohamed.length > 0" class="buyer-section">
          <h4 class="buyer-title">Bought by Mohamed ({{ store.boughtByMohamed.length }})</h4>
          <div class="bought-list__items">
            <ListItems
              v-for="item in store.boughtByMohamed"
              :key="item._id"
              :label="item.name"
              :price="`$${item.price.toFixed(2)}`"
              :purchasedBy="item.boughtBy"
              :timestamp="formatDate(item.createdAt)"
              @edit="handleEdit(item._id)"
              @delete="handleDelete(item._id)"
            />
          </div>
        </div>
      </div>
    </CardView>
  </div>
</template>

<script setup lang="ts">
import { useWeddingStore } from '@/stores/weddingStore'
import { onMounted } from 'vue'
import CardView from './CardView.vue'
import ListItems from './ListItems.vue'

const store = useWeddingStore()

onMounted(async () => {
  await store.fetchBoughtItems()
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
    await store.deleteBoughtItem(itemId)
  }
}
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

.buyer-section {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.buyer-title {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #511f8d;
  font-weight: 600;
}
</style>
