import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/create-post',
            name: 'createPost',
            component: () => import('../views/CreatePostView.vue')
        },
        {
            path: '/list-posted-gigs',
            name: 'listPostedGigs',
            component: () => import('../views/PostedGigsView.vue')
        }
    ]
})

export default router