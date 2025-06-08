<!-- Need to be customized -->
<script  setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';


const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>
<template>
    <Button 
        label="Btn"
        unstyled
        @click="load"
        :loading="loading" 
        pt:root="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2 items-center"
        pt:label="text-white font-bold text-lg"
    >
        <template #icon>
            <img src="@/assets/icons/Users.svg" alt="icon" class="w-5 h-5" />
        </template>          
    </Button>
</template>