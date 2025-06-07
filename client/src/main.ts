import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';

import appointments from './modules/appointments/router';
import Dashboard from './common/layout/Dashboard.vue';

// const routerHome = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     }
// ]


const routes = [
    {
        path: '/',
        component: Dashboard,
        children: [
            ...appointments
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App).use(router).mount('#app')