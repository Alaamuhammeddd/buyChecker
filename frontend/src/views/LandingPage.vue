<script setup lang="ts">
import AddItemButton from '@/components/AddItemButton.vue'
import BoughtList from '@/components/BoughtList.vue'
import FormModal from '@/components/FormModal.vue'
import ToBuyList from '@/components/ToBuyList.vue'
import { ref } from 'vue'
import { useWeddingStore } from '@/stores/weddingStore'

const store = useWeddingStore()
const isModalOpen = ref(false)

const handleAddItem = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleCancel = () => {
  isModalOpen.value = false
}

const handleFormSubmit = async (formData: { name: string; price: number }) => {
  try {
    await store.addToBuyItem(formData.name, formData.price)
    isModalOpen.value = false
  } catch (error) {
    console.error('Failed to add item:', error)
  }
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
      <div v-if="store.error" class="error-banner">
        <p>{{ store.error }}</p>
        <button @click="store.clearError">Dismiss</button>
      </div>
      <div class="landing-page__actions">
        <AddItemButton @add-item="handleAddItem()" />
      </div>
      <div class="landing-page__lists">
        <div class="landing-page__lists--tobuy">
          <ToBuyList />
        </div>
        <div class="landing-page__lists--bought">
          <BoughtList />
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
  height: 100vh;
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
