import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/default',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', name: "root", component: () => import('pages/Project.vue') },
      { path: 'projects/:id/edit', name: "editProject", component: () => import('pages/Project.vue') },
      { path: 'projects/create', name: "createProject", component: () => import('pages/Project.vue') },
      { path: 'projects/reload', name: "refreshProject", component: () => import('pages/Project.vue') }
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
