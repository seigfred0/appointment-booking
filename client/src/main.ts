import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';

import appointments from './modules/appointments/router';
import Dashboard from './common/layout/Dashboard.vue';

import PrimeVue from 'primevue/config';
// import 'primevue/resources/primevue.min.css';   
// import Aura from '@primeuix/themes/aura';

// const routerHome = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     }
// ]
import Button from "primevue/button"


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

const app = createApp(App);
app.use(PrimeVue);

app.component('Button', Button);

// createApp(App)
//     .use(PrimeVue)
//     .use(router).mount('#app')
app.use(router)
app.mount('#app');