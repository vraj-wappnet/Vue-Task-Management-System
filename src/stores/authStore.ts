import { defineStore } from "pinia";
import { ref } from "vue";
import {
  signInWithPopup,
  onAuthStateChanged,
  type User,
  browserPopupRedirectResolver,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: ref<User | null>(null),
    isLoading: ref(false),
    error: ref<string | null>(null),
  }),
  persist: {
    key: "auth-state",
    storage: localStorage,
  },
  actions: {
    async initializeAuth() {
      this.isLoading = true;
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          this.isLoading = false;
          resolve();
        });
      });
    },
    async signInWithGoogle() {
      this.isLoading = true;
      this.error = null;
      try {
        const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
        console.log("data", auth, googleProvider, browserPopupRedirectResolver);
        this.user = result.user;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Authentication failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
    async signOut() {
      this.isLoading = true;
      try {
        await signOut(auth); // Make sure 'auth' is imported from your firebase config
        this.user = null;
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Sign out failed";
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    isAuthenticated: (state: { user: User | null }) => !!state.user,
    displayName: (state: { user: User | null }) => state.user?.displayName || state.user?.email,
    photoURL: (state: { user: User | null }) => state.user?.photoURL,
  },
});
