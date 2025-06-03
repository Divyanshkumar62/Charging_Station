import { defineStore } from "pinia";
import api from "../service/api";
import router from "../router";
const { default: jwt_decode } = await import("jwt-decode");

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
        const token = res.data.token;
        this.token = token;
        localStorage.setItem("token", token);
        console
        const decoded = jwt_decode(token);
        this.user = {
          email: decoded.email,
          id: decoded.id,
        };

        this.error = null;
        router.push("/dashboard");
      } catch (err) {
        console.log(err.message)
        this.error = err.response?.data?.message || "Login failed";
      } finally {
        this.loading = false;
      }
    },

    async register(name, email, password) {
      try {
        this.loading = true;
        const res = await api.post("/auth/register", { name, email, password });
        const token = res.data.token;
        this.token = token;
        localStorage.setItem("token", token);

        const decoded = jwt_decode(token);
        this.user = {
          email: decoded.email,
          id: decoded.id,
        };

        this.error = null;
        router.push("/dashboard");
      } catch (err) {
        console.log(err.message)
        this.error = err.response?.data?.message || "Registration failed";
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});

