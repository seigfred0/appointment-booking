import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';


const routerHome = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]


import appointments from './modules/appointments/router';
import Home from './Home.vue';


const routes = [
    ...routerHome,
    ...appointments
]


const router = createRouter({
    history: createWebHistory(),
    routes
})



createApp(App).use(router).mount('#app')
