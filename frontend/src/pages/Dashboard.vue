<template>
  <div class="min-h-screen p-4 bg-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Your Charging Stations</h1>
      <button
        @click="showForm = true"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Station
      </button>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>

    <div class="flex gap-4 mb-4">
      <select v-model="filters.status" class="border p-2 rounded">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input
        v-model="filters.powerOutput"
        type="number"
        class="border p-2 rounded"
        placeholder="Min Power (kW)"
      />
      <input
        v-model="filters.connectorType"
        type="text"
        class="border p-2 rounded"
        placeholder="Connector Type"
      />
      <button
        @click="fetchStations"
        class="bg-gray-600 text-white px-3 py-2 rounded"
      >
        Filter
      </button>
    </div>

    <p v-if="loading" class="text-gray-500">Loading stations...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StationCard
        v-for="station in stations"
        :key="station._id"
        :station="station"
        @edit="editStation"
        @delete="deleteStation"
      />
    </div>

    <MapViewVue :stations="filteredStations" class="mt-8 h-96" />
    
    <StationForm
      v-if="showForm"
      :editStation="selectedStation"
      @close="resetForm"
      @saved="fetchStations"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
const filteredStations = computed(() => stations.value ?? []);

import api from "../service/api";
import StationCard from "../components/StationCard.vue";
import StationForm from "../components/StationForm.vue";
import { useAuthStore } from "../store/auth";
import MapViewVue from "../components/MapView.Vue";


const auth = useAuthStore();
const logout = () => auth.logout();

const stations = ref([]);
const filters = ref({ status: "", powerOutput: "", connectorType: "" });
const showForm = ref(false);
const selectedStation = ref(null);

async function fetchStations() {
  loading.value = true;
  error.value = null;
  try {
    const res = await api.get("/stations");
    let result = res.data;
    stations.value = result;
  } catch (e) {
    error.value = "Failed to fetch stations.";
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function editStation(station) {
  selectedStation.value = station;
  showForm.value = true;
}

async function deleteStation(id) {
  if (confirm("Are you sure you want to delete this station?")) {
    await api.delete(`/stations/${id}`);
    fetchStations();
  }
}

function resetForm() {
  showForm.value = false;
  selectedStation.value = null;
}

const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  await fetchStations();
  console.log("Stations after fetch:", stations.value);
});
watch(stations, (newStations) => {
  console.log("Stations updated in dashboard:", newStations);
});

</script>
