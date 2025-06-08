<script setup lang="ts">
import sidebar from './sidebar.vue';


</script>


<template>
    <div class="bg-white2 flex h-screen w-screen">
        <sidebar widthPercent="20"></sidebar>
        <main class="flex flex-col w-full h-full items-center">
            <div class="bg-white1 w-full h-[10%] border-b-1 border-borderBottom">
                <!-- Header (Username, notifications, ...) -->
            </div>

            <div class=" bg-white1 h-[90%] w-[94%] mt-10 rounded-xl border-1 border-borderColor2">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>