import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import TaskCreateView from "./TaskCreateView.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";
import { useTaskStore } from "@/stores/taskStore";

// Mock vue-router
const mockRouter = {
  go: vi.fn(),
  push: vi.fn(),
};
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
}));

// Mock TaskForm component
vi.mock("@/components/tasks/TaskForm.vue", () => ({
  default: {
    name: "TaskForm",
    template: '<div class="task-form-mock"><slot /></div>',
    props: ["submitButtonText"],
    methods: {
      reset: vi.fn(),
    },
  },
}));

// Mock vue-i18n
const mockI18n = {
  install: (app: any) => {
    app.config.globalProperties.$t = (key: string) => key; // Mock $t globally
  },
};

// Mock useI18n to return a minimal object
vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key, // Mock t function
  }),
}));

describe("TaskCreateView", () => {
  let wrapper: VueWrapper<any>;
  let taskStore: ReturnType<typeof useTaskStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    taskStore = useTaskStore();

    vi.spyOn(taskStore, "addTask").mockImplementation(() => {});

    wrapper = mount(TaskCreateView, {
      global: {
        plugins: [createPinia(), mockI18n], // Add mockI18n as a plugin
        mocks: {
          $router: mockRouter,
          // $t is now provided by mockI18n, no need to mock it here
        },
        stubs: {
          TaskForm: true,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  it("renders the component with a card and form", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: "v-card" }).exists()).toBe(true);
    expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "v-btn" }).exists()).toBe(true);
  });

  it("passes submitButtonText prop to TaskForm", () => {
    const taskForm = wrapper.findComponent(TaskForm);
    expect(taskForm.props("submitButtonText")).toBe("actions.save");
  });

  it("navigates back when cancel button is clicked", async () => {
    const cancelButton = wrapper.findComponent({ name: "v-btn" });
    await cancelButton.trigger("click");
    expect(mockRouter.go).toHaveBeenCalledWith(-1);
  });

  it("creates a task and navigates to dashboard on form submit", async () => {
    const taskData = { title: "Test Task", description: "Test Description" };
    const taskForm = wrapper.findComponent(TaskForm);
    await taskForm.vm.$emit("submit", taskData);

    expect(taskStore.addTask).toHaveBeenCalledWith(taskData);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "dashboard" });
  });

  it("applies hover styles to the card", async () => {
    const card = wrapper.findComponent({ name: "v-card" });
    expect(card.attributes("style")).toContain("transition: all 0.3s ease-in-out");
    await card.trigger("mouseenter");
    // JSDOM doesn’t support full CSS hover, so we verify transition only
  });
});
