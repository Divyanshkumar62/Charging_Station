import { defineStore } from "pinia";
import api from "../service/api";
import router from "../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async login(email, password) {
      try {
        this.loading = true;
        const res = await api.post("/auth/login", { email, password });
        this.token = res.data.token;
        localStorage.setItem("token", res.data.token);
        this.error = null;
        router.push("/dashboard");
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
