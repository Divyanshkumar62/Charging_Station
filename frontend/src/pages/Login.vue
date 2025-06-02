<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email"
                 class="w-full p-2 mb-4 border rounded" required />
          <input v-model="password" type="password" placeholder="Password"
                 class="w-full p-2 mb-4 border rounded" required />
          <button type="submit"
                  class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded">
            Login
          </button>
          <p class="text-red-500 text-sm mt-2" v-if="auth.error">{{ auth.error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/auth'
  
  const email = ref('')
  const password = ref('')
  const auth = useAuthStore()
  
  function handleLogin() {
    auth.login(email.value, password.value)
  }
  </script>
  