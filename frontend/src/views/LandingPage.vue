<script setup lang="ts">
import AddItemButton from '@/components/AddItemButton.vue'
import BoughtList from '@/components/BoughtList.vue'
import FormModal from '@/components/FormModal.vue'
import EditFormModal from '@/components/EditFormModal.vue'
import ToBuyList from '@/components/ToBuyList.vue'
import SearchBox from '@/components/SearchBox.vue'
import { ref } from 'vue'
import { useWeddingStore } from '@/stores/weddingStore'
import type { ToBuyItem } from '@/types/toBuyItem'
import BoughtFormModal from '@/components/BoughtFormModal.vue'
import type { BoughtItem } from '@/types/boughtItem'

const store = useWeddingStore()
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isBoughtModalOpen = ref(false)
const selectedEditItem = ref<ToBuyItem | BoughtItem | undefined>()
const selectedBoughtItem = ref<BoughtItem | undefined>()
const isItemPurchased = ref(false)

const handleAddItem = () => {
  selectedEditItem.value = undefined
  isModalOpen.value = !isModalOpen.value
}

const handleCancel = () => {
  isModalOpen.value = false
}

const handleEditItem = (item: ToBuyItem) => {
  selectedEditItem.value = item
  isItemPurchased.value = false
  isEditModalOpen.value = true
}

const handleBoughtEdit = (item: BoughtItem) => {
  selectedEditItem.value = item
  isItemPurchased.value = true
  isEditModalOpen.value = true
}

const handleEditCancel = () => {
  isEditModalOpen.value = false
  selectedEditItem.value = undefined
}
const handleBoughtCancel = () => {
  isBoughtModalOpen.value = false
  selectedBoughtItem.value = undefined
}

const handleBoughtOpen = (item: ToBuyItem) => {
  // Cast ToBuyItem to BoughtItem for the modal; BoughtFormModal will handle name/label differences
  selectedBoughtItem.value = item as unknown as BoughtItem
  isBoughtModalOpen.value = true
}

const handleEditSubmit = async (formData: ToBuyItem | BoughtItem) => {
  if (!formData._id) return
  try {
    if (isItemPurchased.value) {
      await store.updateBoughtItem(formData._id, {
        name: (formData as BoughtItem).name,
        price: (formData as BoughtItem).price,
        boughtBy: (formData as BoughtItem).boughtBy,
      })
    } else {
      await store.updateToBuyItem(formData._id, {
        name: (formData as ToBuyItem).name,
        price: (formData as ToBuyItem).price,
      })
    }

    isEditModalOpen.value = false
    selectedEditItem.value = undefined
    isItemPurchased.value = false
  } catch (error) {
    console.error('Failed to update item:', error)
  }
}
const handleBoughtSubmit = async (formData: BoughtItem) => {
  if (!formData._id) return
  try {
    // If the item exists in the toBuy list, this is a 'mark as bought' operation
    const existsInToBuy = store.toBuyItems.find((i) => i._id === formData._id)
    if (existsInToBuy) {
      if (!formData.boughtBy) throw new Error('Please select who bought the item')
      // Pass edited name/price so the bought record reflects changes made in the modal
      await store.markAsBought(
        formData._id,
        formData.boughtBy as 'alaa' | 'mohamed',
        formData.name,
        formData.price,
      )
    } else {
      // Otherwise update existing bought item
      await store.updateBoughtItem(formData._id, {
        name: formData.name,
        price: formData.price,
        boughtBy: formData.boughtBy,
      })
    }

    isBoughtModalOpen.value = false
    selectedBoughtItem.value = undefined
  } catch (error) {
    console.error('Failed to handle bought submit:', error)
  }
}

const handleFormSubmit = async (formData: { name: string; price: number }) => {
  try {
    await store.addToBuyItem(formData.name, formData.price)
    isModalOpen.value = false
  } catch (error) {
    console.error('Failed to add item:', error)
  }
}

const handleSearch = (query: string) => {
  store.searchQuery = query
}
</script>
<template>
  <div class="landing-page">
    <div class="landing-page__image">
      <img src="@/assets/images/buychecker.png" alt="Landing Image" />
    </div>
    <div class="landing-page__contents">
      <div class="landing-page__modal">
        <FormModal :open="isModalOpen" @submit="handleFormSubmit" @cancel="handleCancel" />
      </div>
      <div class="landing-page__edit-modal">
        <EditFormModal
          :open="isEditModalOpen"
          :item="selectedEditItem"
          :purchased="isItemPurchased"
          @submit="handleEditSubmit"
          @cancel="handleEditCancel"
        />
      </div>
      <div class="landing-page__bought-modal">
        <BoughtFormModal
          :open="isBoughtModalOpen"
          :item="selectedBoughtItem"
          @submit="handleBoughtSubmit"
          @cancel="handleBoughtCancel"
        />
      </div>
      <div class="landing-page__actions">
        <AddItemButton @add-item="handleAddItem()" />
      </div>
      <div class="landing-page__search">
        <SearchBox @search="handleSearch" />
      </div>
      <div class="landing-page__lists">
        <div class="landing-page__lists--tobuy">
          <ToBuyList @edit="handleEditItem" @buy="handleBoughtOpen" />
        </div>
        <div class="landing-page__lists--bought">
          <BoughtList @edit="handleBoughtEdit" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.landing-page {
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9e4f2;
  border-radius: 5px;
  &__contents {
    padding: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
  &__image {
    img {
      width: 400px;
      height: auto;
    }
  }
  &__lists {
    display: flex;

    flex-direction: column;
    gap: 2rem;
  }
}
</style>

<style scoped lang="scss">
.error-banner {
  background: #fee;
  color: #c33;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  p {
    margin: 0;
  }

  button {
    background: transparent;
    border: 1px solid #c33;
    color: #c33;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background: rgba(204, 51, 51, 0.1);
    }
  }
}
</style>
