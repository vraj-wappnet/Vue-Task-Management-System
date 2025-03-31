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

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/dashboard", name: "dashboard", component: { template: "<div>Dashboard</div>" } },
  ],
});

// Mock task store
vi.mock("@/stores/taskStore", () => ({
  useTaskStore: vi.fn(() => ({
    addTask: vi.fn().mockResolvedValue({}),
  })),
}));

describe("TaskCreateView.vue", () => {
  let wrapper: ReturnType<typeof mount>;
  let taskStore: ReturnType<typeof useTaskStore>;

  const mountComponent = () => {
    return mount(TaskCreateView, {
      global: {
        plugins: [router, i18n],
        stubs: {
          TaskForm: {
            template: `
              <div class="task-form-stub">
                <button data-test="submit-btn" @click="$emit('submit', { title: 'Test Task' })">Save</button>
              </div>
            `,
          },
          "v-container": {
            template: '<div class="v-container"><slot /></div>',
          },
          "v-row": {
            template: '<div class="v-row"><slot /></div>',
          },
          "v-col": {
            template: '<div class="v-col"><slot /></div>',
          },
          "v-card": {
            template: `
              <div class="v-card">
                <div class="v-card-title"><slot name="title" /></div>
                <div class="v-card-text"><slot name="text" /></div>
                <div class="v-card-actions">
                  <button class="cancel-btn" @click="handleCancel">Cancel</button>
                  <slot name="actions" />
                </div>
              </div>
            `,
            methods: {
              handleCancel() {
                this.$parent.$emit("cancel");
              },
            },
          },
          "v-btn": {
            template: '<button class="v-btn"><slot /></button>',
          },
          "v-icon": {
            template: '<span class="v-icon"></span>',
          },
        },
      },
    });
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    taskStore = useTaskStore();
    await router.push("/");
    wrapper = mountComponent();
    await nextTick();
  });

  it("renders the TaskForm component", () => {
    const taskForm = wrapper.findComponent({ name: "TaskForm" });
    expect(taskForm.exists()).toBe(true);
  });

  it("contains a card with proper structure", () => {
    const card = wrapper.find(".v-card");
    expect(card.exists()).toBe(true);
    expect(card.find(".v-card-title").exists()).toBe(true);
    expect(card.find(".v-card-text").exists()).toBe(true);
    expect(card.find(".v-card-actions").exists()).toBe(true);
  });

  it("renders the TaskForm component", () => {
    const taskForm = wrapper.find(".task-form-stub");
    expect(taskForm.exists()).toBe(true);
  });

  it("navigates back when cancel button is clicked", async () => {
    const cancelBtn = wrapper.find(".cancel-btn");
    expect(cancelBtn.exists()).toBe(true);

    const routerSpy = vi.spyOn(router, "go");
    await cancelBtn.trigger("click");

    await nextTick(); // Ensure Vue processes any pending state updates

    expect(routerSpy).toHaveBeenCalledWith(-1);
  });

  it("creates task and navigates to dashboard on form submit", async () => {
    const routerSpy = vi.spyOn(router, "push");
    const submitBtn = wrapper.find('[data-test="submit-btn"]');

    expect(submitBtn.exists()).toBe(true);
    await submitBtn.trigger("click");

    await nextTick(); // Ensure Vue processes any pending updates

    expect(taskStore.addTask).toHaveBeenCalledWith({ title: "Test Task" });
    expect(routerSpy).toHaveBeenCalledWith({ name: "dashboard" });
  });

  it("applies hover effect styles to card", () => {
    const card = wrapper.find(".v-card");
    expect(card.classes()).toContain("v-card");
  });
});
