<script setup lang="ts">
import AddItemButton from '@/components/AddItemButton.vue'
import BoughtList from '@/components/BoughtList.vue'
import FormModal from '@/components/FormModal.vue'
import ToBuyList from '@/components/ToBuyList.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)
const handleAddItem = () => {
  isModalOpen.value = !isModalOpen.value
}
const handleCancel = () => {
  isModalOpen.value = false
}
</script>
<template>
  <div class="landing-page">
    <div class="landing-page__image">
      <img src="@/assets/images/buychecker.png" alt="Landing Image" />
    </div>
    <div class="landing-page__contents">
      <div class="landing-page__modal">
        <FormModal :open="isModalOpen" @cancel="handleCancel" />
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
