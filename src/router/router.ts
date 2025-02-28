import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { RequestToCheckAuth } from "../composables/API/Auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/partials/Index.vue"),
      },
      {
        path: "/translator",
        name: "translator",
        component: () => import("../views/Translator.vue"),
      },
      {
        path: "/story",
        name: "story",
        component: () => import("../views/Story.vue"),
      },
      {
        path: "/dictionary",
        name: "dictionary",
        component: () => import("../views/Dictionary.vue"),
      },
    ],
  },

  {
    path: "/cb-admin",
    name: "cb-admin",
    component: () => import("../views/admin/Index.vue"),
    redirect: { name: "login" },
    children: [
      {
        path: "/cb-admin/login",
        name: "login",
        component: () => import("../views/admin/Login.vue"),
      },
      {
        path: "/cb-admin/cpanel",
        name: "cpanel",
        redirect: { name: "content-editor" },
        meta: { requiresAuth: true },
        component: () => import("../views/admin/ControlPanel.vue"),
        children: [
          {
            path: "/cb-admin/cpanel/content-editor",
            name: "content-editor",
            redirect: { name: "home-page-editor" },
            meta: { requiresAuth: true },
            component: () => import("../views/admin/ContentEditor.vue"),
            children: [
              {
                path: "/cb-admin/cpanel/content-editor/home-page-editor",
                name: "home-page-editor",
                meta: { requiresAuth: true },
                component: () =>
                  import("../views/admin/contentPageEditor/HomepageEditor.vue"),
              },

              {
                path: "/cb-admin/cpanel/content-editor/story-page-editor",
                name: "story-page-editor",
                meta: { requiresAuth: true },
                redirect: { name: "new-story" },
                component: () =>
                  import(
                    "../views/admin/contentPageEditor/StoryPageEditor.vue"
                  ),
                children: [
                  {
                    path: "/cb-admin/cpanel/content-editor/story-page-editor/new-story/:id?",
                    name: "new-story",
                    meta: { requiresAuth: true },
                    component: () =>
                      import(
                        "../views/admin/contentPageEditor/AddNewStory.vue"
                      ),
                  },
                  {
                    path: "/cb-admin/cpanel/content-editor/story-page-editor/section-lists",
                    name: "section-lists",
                    meta: { requiresAuth: true },
                    component: () =>
                      import(
                        "../views/admin/contentPageEditor/SectionLists.vue"
                      ),
                  },
                ],
              },
            ],
          },
          {
            path: "/cb-admin/cpanel/dictionary-editor",
            name: "dictionary-editor",
            redirect: { name: "add-dic-entry" },
            meta: { requiresAuth: true },
            component: () => import("../views/admin/Dictionary.vue"),
            children: [
              {
                path: "/cb-admin/cpanel/dictionary-editor/add-dic-entry/:id?",
                name: "add-dic-entry",
                meta: { requiresAuth: true },
                component: () =>
                  import(
                    "../views/admin/dictionaryPageEditor/AddNewDicEntry.vue"
                  ),
              },
              {
                path: "/cb-admin/cpanel/dictionary-editor/dic-entry-list",
                name: "dic-entry-list",
                meta: { requiresAuth: true },
                component: () =>
                  import(
                    "../views/admin/dictionaryPageEditor/DicEntryLists.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth) {
    const response = await RequestToCheckAuth();

    if (response.status === "failed") {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
