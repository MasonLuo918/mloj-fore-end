import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/admin',
        redirect: '/admin/dashboard'
    }, {
        path: "/admin",
        name: "Home",
        component: Home,
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import (
                    /* webpackChunkName: "dashboard" */
                    "../views/Dashboard.vue")
            }, {
                path: "problemList",
                name: "admin-problem-list",
                meta: {
                    title: '问题列表'
                },
                component: () => import (
                    /* webpackChunkName: "table" */
                    "../views/ml-admin-problemList.vue")
            }, {
                path: "problemUpload",
                name: "admin-problem-upload",
                component: () => import(
                    "../views/ml-problem-upload.vue"
                    ),
                meta: {
                    title: '问题上传'
                }
            }, {
                path: "bookList",
                name: "admin-book-list",
                component: () => import(
                    "../views/ml-admin-bookList.vue"
                    ),
                meta: {
                    title: '书籍列表'
                }
            }, {
                path: "indexList",
                name: "admin-index-list",
                component: () => import(
                    "../views/ml-admin-indexList.vue"
                    ),
                meta: {
                    title: '章节列表'
                }
            },
        ]
    }, {
        path: "/admin/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
            /* webpackChunkName: "login" */
            "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
