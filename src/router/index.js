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
            name: 'userRegister',
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
            path: '/profile',
            name: 'profileView',
            component: () => import('../views/ProfileView.vue')
        },
        {
            path: '/edit-profile',
            name: 'editProfile',
            component: () => import('../views/EditProfileView.vue')
        },
        {
            path: '/edit-password',
            name: 'editPassword',
            component: () => import('../views/ChangePasswordView.vue')
        }
    ]
})

export default router