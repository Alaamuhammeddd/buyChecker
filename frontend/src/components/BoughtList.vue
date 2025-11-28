<template>
  <div class="bought-list">
    <CardView :label="`Bought List (${store.filteredBoughtItems.length})`">
      <div v-if="store.loading" class="loading">Loading...</div>
      <div v-else-if="store.filteredBoughtItems.length === 0" class="empty">
        <p>No items bought yet!</p>
      </div>
      <div v-else>
        <!-- Bought by Alaa -->
        <div v-if="store.filteredBoughtByAlaa.length > 0" class="buyer-section">
          <h4 class="buyer-title">Bought by Alaa ({{ store.filteredBoughtByAlaa.length }})</h4>
          <div class="bought-list__items">
            <ListItems
              v-for="item in store.filteredBoughtByAlaa"
              :key="item._id"
              :name="item.name"
              :price="`${item.price.toFixed(2)} EGP`"
              :purchasedBy="item.boughtBy"
              :purchased="true"
              :timestamp="formatDate(item.createdAt)"
              @edit="handleEdit(item)"
              @delete="handleDelete(item._id)"
            />
          </div>
        </div>

        <!-- Bought by Mohamed -->
        <div v-if="store.filteredBoughtByMohamed.length > 0" class="buyer-section">
          <h4 class="buyer-title">
            Bought by Mohamed ({{ store.filteredBoughtByMohamed.length }})
          </h4>
          <div class="bought-list__items">
            <ListItems
              v-for="item in store.filteredBoughtByMohamed"
              :key="item._id"
              :name="item.name"
              :purchased="true"
              :price="`${item.price.toFixed(2)} EGP`"
              :purchasedBy="item.boughtBy"
              :timestamp="formatDate(item.createdAt)"
              @edit="handleEdit(item)"
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
import type { BoughtItem } from '@/types/boughtItem'

const store = useWeddingStore()
const emit = defineEmits<{
  edit: [item: BoughtItem]
}>()
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

const handleEdit = (item: BoughtItem) => {
  emit('edit', item)
}

const handleDelete = async (itemId: string | undefined) => {
  if (!itemId) return
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
