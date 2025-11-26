<template>
  <div class="landing-page">
    <div class="landing-page__image">
      <img src="@/assets/images/buychecker.png" alt="Landing Image" />
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.landing-page {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #e9e4f2;
  border-radius: 5px;
  &__image {
    img {
      width: 400px;
      height: auto;
    }
  }
}
</style>
