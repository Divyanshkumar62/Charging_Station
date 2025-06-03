<template>
  <div id="map" class="w-full h-full rounded shadow"></div>
</template>

<style scoped>
#map {
  height: 100%;
  min-height: 400px;
  width: 100%;
  border-radius: 0.5rem;
  z-index: 0;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>


<script setup>
import { onMounted, watch } from "vue";
import L from "leaflet";

const props = defineProps(["stations"]);
console.log("Received stations:", props.stations);

let map,
  markers = [];

function loadMap() {
  console.log("Initializing Leaflet...");
  if (!document.getElementById("map")) {
    console.error("Map container is missing!");
    return;
  }

  map = L.map("map").setView([20, 78], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}

function plotMarkers() {
  if (!map) {
    console.error("Leaflet map is not initialized yet!");
    return;
  }

  if (!props.stations || props.stations.length === 0) {
    console.warn("No stations available to plot.");
    return;
  }

  markers.forEach((m) => m.remove());
  markers = [];

  props.stations.forEach((s) => {
    if (!s.location || typeof s.location.latitude !== "number" || typeof s.location.longitude !== "number") {
      console.warn("Invalid station location:", s);
      return;
    }

    const marker = L.marker([s.location.latitude, s.location.longitude])
      .addTo(map) // Avoids undefined `map` issue
      .bindPopup(`<strong>${s.name}</strong><br>${s.status}, ${s.powerOutput} kW`);
    markers.push(marker);
  });

  if (props.stations.length > 0) {
    const first = props.stations[0];
    map.setView([first.location.latitude, first.location.longitude], 12);
  }
}

onMounted(() => {
  setTimeout(() => {
    loadMap();
    plotMarkers();
  }, 500);
});

watch(() => props.stations, (newStations) => {
  console.log("New station data:", JSON.parse(JSON.stringify(newStations))); 
  plotMarkers();
}, { deep: true });
</script>

<style>
@import "leaflet/dist/leaflet.css";


</style>
