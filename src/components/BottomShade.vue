<script setup lang="ts">
//это компонент, который создает небольшую градиентную тень
//и он предназначен, чтобы помещаться внизу панелей
//и делать красивый эффект плавного исчезновения контента
</script>

<template>
  <div class="bottom-shade__gradient"></div>
</template>

<style scoped>
.bottom-shade__gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, var(--bg-dark) 100%);
  height: 8px;
  margin: 0;
}
</style>
