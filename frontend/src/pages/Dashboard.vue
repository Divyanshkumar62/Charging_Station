<template>
  <div class="min-h-screen p-4 bg-gray-100">
    <header
      class="bg-white shadow-sm rounded px-6 py-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <svg
          class="w-7 h-7 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 2L3 14h9v8l10-12h-9z" />
        </svg>
        <h1 class="text-xl font-semibold text-gray-800">
          EV Charger Dashboard
        </h1>
      </div>

      <div class="flex flex-wrap gap-2">
        <button @click="currentView = 'card'" :class="viewButtonClass('card')">
          Card View
        </button>

        <button @click="currentView = 'map'" :class="viewButtonClass('map')">
          Map View
        </button>

        <button
          @click="showForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Station
        </button>

        <div class="flex items-center gap-3 pr-4 border-r">
          <img src="https://i.pravatar.cc/40" class="w-8 h-8 rounded-full" />
          <span class="text-gray-700">Welcome, {{ auth.user?.email }}</span>
        </div>

        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <select v-model="filters.status" class="border p-2 rounded w-full">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <input
        v-model="filters.powerOutput"
        type="number"
        class="border p-2 rounded w-full"
        placeholder="Min Power (kW)"
      />
      <input
        v-model="filters.connectorType"
        type="text"
        class="border p-2 rounded w-full"
        placeholder="Connector Type"
      />
      <button
        @click="fetchStations"
        class="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded w-full"
      >
        Filter
      </button>
    </div>

    <p v-if="loading" class="text-gray-500">Loading stations...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p
      v-if="!loading && !error && filteredStations.length === 0"
      class="text-gray-500"
    >
      No charging stations found with current filters.
    </p>

    <div
      v-if="currentView === 'card'"
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <StationCard
        v-for="station in filteredStations"
        :key="station._id"
        :station="station"
        @edit="editStation"
        @delete="deleteStation"
      />
    </div>

    <div v-if="currentView === 'map'" class="w-full h-[500px] mt-6">
      <MapViewVue :stations="filteredStations" />
    </div>

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


const currentView = ref("card");

const viewButtonClass = (view) => {
  return [
    "px-4 py-2 rounded border transition",
    currentView.value === view
      ? "bg-blue-600 text-white border-blue-700"
      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200",
  ].join(" ");
};

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
