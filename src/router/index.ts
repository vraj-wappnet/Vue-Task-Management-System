import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/",
      name: "dashboardMain",
      component: () => import("../views/ProgressReport.vue"),
    },
    {
      path: "/tasks/create",
      name: "task-create",
      component: () => import("../views/TaskCreateView.vue"),
    },
    {
      path: "/tasks/edit/:id",
      name: "task-edit",
      component: () => import("../views/TaskEditView.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
