<template>
    <div class="bg-white p-4 rounded shadow flex flex-col gap-2">
      <h2 class="text-lg font-semibold">{{ station.name }}</h2>
      <p>Status: <strong>{{ station.status }}</strong></p>
      <p>Power Output: {{ station.powerOutput }} kW</p>
      <p>Connector: {{ station.connectorType }}</p>
      <p>Location: [{{ station.location.latitude }}, {{ station.location.longitude }}]</p>
  
      <div class="flex gap-2 mt-2">
        <button @click="$emit('edit', station)" class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
        <button @click="$emit('delete', station._id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['station'])
  </script>
  