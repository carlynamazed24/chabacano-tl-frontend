import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

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
        component: () => import("../views/admin/ControlPanel.vue"),
        children: [
          {
            path: "/cb-admin/cpanel/content-editor",
            name: "content-editor",
            redirect: { name: "home-page-editor" },
            component: () => import("../views/admin/ContentEditor.vue"),
            children: [
              {
                path: "/cb-admin/cpanel/content-editor/home-page-editor",
                name: "home-page-editor",
                component: () =>
                  import("../views/admin/contentPageEditor/HomepageEditor.vue"),
              },

              {
                path: "/cb-admin/cpanel/content-editor/story-page-editor",
                name: "story-page-editor",
                redirect: { name: "new-story" },
                component: () =>
                  import(
                    "../views/admin/contentPageEditor/StoryPageEditor.vue"
                  ),
                children: [
                  {
                    path: "/cb-admin/cpanel/content-editor/story-page-editor/new-story",
                    name: "new-story",
                    component: () =>
                      import(
                        "../views/admin/contentPageEditor/AddNewStory.vue"
                      ),
                  },
                  {
                    path: "/cb-admin/cpanel/content-editor/story-page-editor/section-lists",
                    name: "section-lists",
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
            component: () => import("../views/admin/Dictionary.vue"),
            children: [
              {
                path: "/cb-admin/cpanel/dictionary-editor/add-dic-entry",
                name: "add-dic-entry",
                component: () =>
                  import(
                    "../views/admin/dictionaryPageEditor/AddNewDicEntry.vue"
                  ),
              },
              {
                path: "/cb-admin/cpanel/dictionary-editor/dic-entry-list",
                name: "dic-entry-list",
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
  history: createWebHistory(),
  routes,
});

export default router;
