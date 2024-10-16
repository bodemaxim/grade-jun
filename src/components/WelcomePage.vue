<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emits = defineEmits<{
  passwordCorrect: []
}>()

const inputValue = ref('')

const correctPassword = 'Tages2024'

const checkPassword = () => {
  if (inputValue.value === correctPassword) {
    console.log('password-correct')
    emits('passwordCorrect')
    localStorage.setItem('tages2024', 'true')
  } else {
    alert('Пароль неверный. Попробуй еще раз!')
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    checkPassword()
  }
}

onMounted(() => {
  const isLoggedIn = localStorage.getItem('tages2024')
  if (isLoggedIn) {
    console.log('Пользователь уже авторизован')
    emits('passwordCorrect')
  }
})
</script>

<template>
  <div class="welcome-page">
    <div class="form-container">
      <h3>Максим Бодэ</h3>
      <h1 class="mb-7">Аттестация Junior Frontend Developer</h1>
      <input
        class="input-form"
        type="password"
        v-model="inputValue"
        placeholder="введите пароль"
        @keydown="handleKeyDown"
      />
      <button @click="checkPassword">войти</button>
    </div>
  </div>
</template>

<style scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--primary-dark);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-form {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004494;
}
</style>
