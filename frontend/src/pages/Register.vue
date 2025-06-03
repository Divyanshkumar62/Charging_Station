<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none z-0">
        <svg class="w-full h-full" viewBox="0 0 1440 320">
          <path fill="#ffffff" fill-opacity="0.2"
            d="M0,160L40,176C80,192,160,224,240,213.3C320,203,400,149,480,154.7C560,160,640,224,720,218.7C800,213,880,139,960,128C1040,117,1120,171,1200,186.7C1280,203,1360,181,1400,170.7L1440,160V320H0Z" />
        </svg>
      </div>
  
      <div class="relative z-10 bg-white shadow-2xl rounded-lg px-10 py-8 w-full max-w-md">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <input v-model="name" type="text" placeholder="Full Name" class="w-full p-3 border rounded-lg" required />
          <input v-model="email" type="email" placeholder="Email" class="w-full p-3 border rounded-lg" required />
          <input v-model="password" type="password" placeholder="Password" class="w-full p-3 border rounded-lg" required />
  
          <button type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200">
            Register
          </button>
  
          <p class="text-red-500 text-sm text-center" v-if="auth.error">{{ auth.error }}</p>
  
          <p class="text-center text-sm mt-4 text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-indigo-600 hover:underline">Login here</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/auth'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const auth = useAuthStore()
  
  function handleRegister() {
    auth.register(name.value, email.value, password.value)
  }
  </script>
  