import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/admin/ml-admin-home.vue";
import userHome from "../views/user/ml-home.vue"

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
                    "../views/admin/ml-admin-dashboard.vue")
            }, {
                path: "problemList",
                name: "admin-problem-list",
                meta: {
                    title: '问题列表'
                },
                component: () => import (
                    /* webpackChunkName: "table" */
                    "../views/admin/ml-admin-problemList.vue")
            }, {
                path: "problemUpload",
                name: "admin-problem-upload",
                component: () => import(
                    "../views/admin/ml-admin-problem-upload.vue"
                    ),
                meta: {
                    title: '问题上传'
                }
            }, {
                path: "bookList",
                name: "admin-book-list",
                component: () => import(
                    "../views/admin/ml-admin-bookList.vue"
                    ),
                meta: {
                    title: '书籍列表'
                }
            }, {
                path: "indexList",
                name: "admin-index-list",
                component: () => import(
                    "../views/admin/ml-admin-indexList.vue"
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
            "../views/admin/ml-admin-login.vue")
    },

    {
        path: '/user',
        redirect: '/user/dashboard'
    },
    {
        path: '/user',
        name: 'user-home',
        component: userHome,
        children: [
            {
                path: 'dashboard',
                component: () => import(
                    "../views/user/ml-dashboard.vue"
                    ),
                meta: {
                    title: "用户首页"
                }
            },
            {
                path: 'problemDetail/:id',
                component: () => import(
                    "../views/user/ml-judge.vue"
                    ),
                meta: {
                    title: "问题详情"
                }
            },
            {
                path: 'solutionDetail/:id',
                component: () => import(
                    "../views/user/ml-solution-detail.vue"
                    ),
                meta: {
                    title: "提交详情"
                }
            }, {
                path: 'bookDetail/:id/:name',
                component: () => import(
                    "../views/user/ml-book-detail.vue"
                    ),
                meta: {
                    title: "书籍详情"
                }
            }
        ]
    },
    {
        path: '/',
        redirect: '/user/login'
    },
    {
        path: '/user/login',
        component: () => import(
            "../views/user/ml-login.vue"
            ),
        meta: {
            title: "用户登录"
        }
    },
    {
        path: '/user/register',
        component: () => import(
            "../views/user/ml-register.vue"
            ),
        meta: {
            title: "用户注册"
        }
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
