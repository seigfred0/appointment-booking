<script setup lang="ts">
import sidebar from './sidebar.vue';
</script>

<template>
    <div class="flex h-screen ">
        <sidebar></sidebar>
        <main class="bg-green-50 w-8/10">
            <!-- Header (Username, notifications, ...) -->
            <router-view></router-view>
        </main>
    </div>
</template>