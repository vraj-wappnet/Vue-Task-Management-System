// tests/unit/TaskCreateView.spec.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TaskCreateView from "@/views/TaskCreateView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useTaskStore } from "@/stores/taskStore";
import { createI18n } from "vue-i18n";
import { nextTick } from "vue";

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      "app.createTask": "Create Task",
      "actions.save": "Save",
      "actions.cancel": "Cancel",
    },
  },
});

// Mock router with proper initialization
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: { template: "<div>Home</div>" } },
    { path: "/dashboard", name: "dashboard", component: { template: "<div>Dashboard</div>" } },
  ],
});

// Enhanced task store mock
vi.mock("@/stores/taskStore", () => ({
  useTaskStore: vi.fn(() => ({
    addTask: vi.fn().mockResolvedValue({}),
  })),
}));

describe("TaskCreateView.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  let taskStore: ReturnType<typeof useTaskStore>;

  const mountComponent = async () => {
    const wrapper = mount(TaskCreateView, {
      global: {
        plugins: [router, i18n],
        stubs: {
          TaskForm: {
            template: `
              <div class="task-form-stub">
                <button data-test="submit-btn">Save</button>
              </div>
            `,
          },
          "v-container": true,
          "v-row": true,
          "v-col": true,
          "v-card": {
            template: `
              <div class="v-card">
                <slot name="title"></slot>
                <slot name="text"></slot>
                <div class="v-card-actions">
                  <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
                  <slot name="actions"></slot>
                </div>
              </div>
            `,
          },
        },
      },
    });
    await nextTick();
    return wrapper;
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    taskStore = useTaskStore();
    await router.push("/");
    wrapper = await mountComponent();
  });

  it("renders the TaskForm component", () => {
    const taskForm = wrapper.find(".task-form-stub");
    expect(taskForm.exists()).toBe(true);
  });

  it("contains a card with proper structure", () => {
    const card = wrapper.find(".v-card");
    expect(card.exists()).toBe(true);
    expect(card.find(".v-card-actions").exists()).toBe(true);
  });

  it("navigates back when cancel button is clicked", async () => {
    const routerSpy = vi.spyOn(router, "go");
    const card = wrapper.findComponent({ name: "v-card" });
    const cancelBtn = card.find(".cancel-btn");

    expect(cancelBtn.exists()).toBe(true);
    await cancelBtn.trigger("click");
    expect(routerSpy).toHaveBeenCalledWith(-1);
  });

  it("creates task and navigates to dashboard on form submit", async () => {
    const routerSpy = vi.spyOn(router, "push");
    const submitBtn = wrapper.find('[data-test="submit-btn"]');

    expect(submitBtn.exists()).toBe(true);
    await submitBtn.trigger("click");

    expect(taskStore.addTask).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith({ name: "dashboard" });
  });
});
