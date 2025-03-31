// tests/unit/GoogleSignInButton.spec.ts
import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import { mount } from "@vue/test-utils";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton.vue";
import { useAuthStore } from "@/stores/authStore";

// Create a complete mock of the auth store
const createAuthStoreMock = (options: { isLoading: boolean }) => ({
  $id: "auth",
  $state: {
    isLoading: options.isLoading,
    user: null,
    error: null,
  },
  isLoading: options.isLoading,
  user: null,
  error: null,
  signInWithGoogle: vi.fn().mockResolvedValue(undefined),
  $patch: vi.fn(),
  $reset: vi.fn(),
  $subscribe: vi.fn(),
  $onAction: vi.fn(),
  $dispose: vi.fn(),
});

// Mock the auth store
vi.mock("@/stores/authStore", () => ({
  useAuthStore: vi.fn(() => createAuthStoreMock({ isLoading: false })),
}));

// Mock window methods
const originalInnerWidth = window.innerWidth;
const resizeEvent = new Event("resize");

describe("GoogleSignInButton.vue", () => {
  function createWrapper(propsData = {}) {
    return mount(GoogleSignInButton, {
      global: {
        stubs: {
          "v-btn": {
            template: `
              <button
                class="v-btn"
                :class="$attrs.class"
                :disabled="disabled || loading"
                :loading="loading ? 'true' : undefined"
                @click="$emit('click', $event)"
              >
                <i v-if="prependIcon" class="v-icon">{{ prependIcon }}</i>
                <slot />
              </button>
            `,
            props: {
              disabled: {
                type: Boolean,
                default: false,
              },
              loading: {
                type: Boolean,
                default: false,
              },
              variant: String,
              ripple: Boolean,
              prependIcon: String,
            },
          },
          "v-icon": {
            template: '<i class="v-icon"><slot /></i>',
          },
        },
      },
      propsData,
    });
  }

  let wrapper: ReturnType<typeof createWrapper>;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default mock with isLoading: false
    vi.mocked(useAuthStore).mockReturnValue(createAuthStoreMock({ isLoading: false }));
    authStore = useAuthStore();
    wrapper = createWrapper();
  });

  afterAll(() => {
    window.innerWidth = originalInnerWidth;
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("shows text button on larger screens", async () => {
    window.innerWidth = 1024;
    window.dispatchEvent(resizeEvent);
    await wrapper.vm.$nextTick();

    const textBtn = wrapper.find(".v-btn.d-none.d-sm-flex");
    const iconBtn = wrapper.find(".v-btn.d-sm-none");

    expect(textBtn.exists()).toBe(true);
    expect(iconBtn.exists()).toBe(false);
    expect(textBtn.find(".v-icon").exists()).toBe(true);
  });

  it("shows icon button on smaller screens", async () => {
    window.innerWidth = 480;
    window.dispatchEvent(resizeEvent);
    await wrapper.vm.$nextTick();

    const textBtn = wrapper.find(".v-btn.d-none.d-sm-flex");
    const iconBtn = wrapper.find(".v-btn.d-sm-none");

    expect(textBtn.exists()).toBe(false);
    expect(iconBtn.exists()).toBe(true);
    expect(iconBtn.find(".v-icon").exists()).toBe(true);
  });

  it("calls signInWithGoogle when text button is clicked", async () => {
    window.innerWidth = 1024;
    window.dispatchEvent(resizeEvent);
    await wrapper.vm.$nextTick();

    const textBtn = wrapper.find(".v-btn.d-none.d-sm-flex");
    await textBtn.trigger("click");

    expect(authStore.signInWithGoogle).toHaveBeenCalled();
  });

  it("calls signInWithGoogle when icon button is clicked", async () => {
    window.innerWidth = 480;
    window.dispatchEvent(resizeEvent);
    await wrapper.vm.$nextTick();

    const iconBtn = wrapper.find(".v-btn.d-sm-none");
    await iconBtn.trigger("click");

    expect(authStore.signInWithGoogle).toHaveBeenCalled();
  });

  it("shows loading state when authStore.isLoading is true", async () => {
    // Override mock for this test only
    vi.mocked(useAuthStore).mockReturnValue(createAuthStoreMock({ isLoading: true }));
    const loadingWrapper = createWrapper();
    await loadingWrapper.vm.$nextTick();

    const button = loadingWrapper.find(".v-btn");
    expect(button.attributes("loading")).toBe("true");
  });

  it("disables button when authStore.isLoading is true", async () => {
    // Override mock for this test only
    vi.mocked(useAuthStore).mockReturnValue(createAuthStoreMock({ isLoading: true }));
    const loadingWrapper = createWrapper();
    await loadingWrapper.vm.$nextTick();

    const button = loadingWrapper.find(".v-btn");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("adds and removes resize event listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const newWrapper = createWrapper();
    newWrapper.unmount();

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
