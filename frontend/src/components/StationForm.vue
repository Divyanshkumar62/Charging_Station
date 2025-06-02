<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded shadow w-full max-w-md">
      <h2 class="text-xl mb-4">{{ isEdit ? "Edit" : "Add" }} Station</h2>
      <form @submit.prevent="submitForm" class="flex flex-col gap-3">
        <input
          v-model="form.name"
          required
          placeholder="Name"
          class="border p-2 rounded"
        />
        <input
          v-model="form.location.latitude"
          required
          placeholder="Latitude"
          type="number"
          class="border p-2 rounded"
        />
        <input
          v-model="form.location.longitude"
          required
          placeholder="Longitude"
          type="number"
          class="border p-2 rounded"
        />
        <input
          v-model="form.powerOutput"
          required
          type="number"
          placeholder="Power Output (kW)"
          class="border p-2 rounded"
        />
        <input
          v-model="form.connectorType"
          required
          placeholder="Connector Type"
          class="border p-2 rounded"
        />
        <select v-model="form.status" class="border p-2 rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div class="flex justify-between mt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {{ isEdit ? "Update" : "Create" }}
          </button>
          <button
            @click="$emit('close')"
            type="button"
            class="bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../service/api";

const props = defineProps(["editStation"]);
const emit = defineEmits(["close", "saved"]);

const isEdit = !!props.editStation;
const form = ref({
  name: "",
  location: { latitude: "", longitude: "" },
  status: "Active",
  powerOutput: "",
  connectorType: "",
});

watch(
  () => props.editStation,
  (val) => {
    if (val) form.value = JSON.parse(JSON.stringify(val));
  }
);

async function submitForm() {
  try {
    if (isEdit) {
      await api.put(`/stations/${props.editStation._id}`, form.value);
    } else {
      await api.post("/stations", form.value);
    }
    emit("saved");
    emit("close");
  } catch (err) {
    alert("Error saving station.");
    console.error(err);
  }
}
</script>
