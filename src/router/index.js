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
            path: '/jobs',
            name: 'applyView',
            component: () => import('../views/ApplyView.vue')
        },
        {
            path: '/applications',
            name: 'userApplications',
            component: () => import('../views/UserApplications.vue')
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
        },
        {
            path: '/list-posted-gigs',
            name: 'listPostedGigs',
            component: () => import('../views/PostedGigsView.vue')
        }

    ]
})

export default router