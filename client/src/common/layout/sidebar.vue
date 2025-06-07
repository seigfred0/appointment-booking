<script setup lang="ts">
import FootprintsIcon from '@assets/icons/Footprints.svg';
import Hospital from '@assets/icons/Hospital.svg';
import Users from '@assets/icons/Users.svg';
import Gear from '@assets/icons/Gear.svg';
import SignOut from '@assets/icons/SignOut.svg';
</script>

<template>
    <aside class="flex flex-col w-2/10 px-5 py-8 border-r bg-white1  border-borderColor h-full">
            <div class="flex gap-3 items-center border-b-1 border-borderBottom pb-8">
                <div class="size-8.5 bg-purple rounded-lg"></div>
                <p class="text-lg font-bold leading-5">Clinic Craft <br> Digital</p>
            </div>
            
            <nav class="flex flex-col pt-6 justify-between h-full overflow-y-auto">
                <ul class="flex flex-col gap-1">
                    <li class="cursor-pointer hover:bg-btnHover pt-3 pb-3 w-full  rounded-xl pl-5">
                        <div class="flex gap-2.5 ">
                            <img :src="FootprintsIcon" alt="Footprints Icon">
                            <span>Appointments</span>
                        </div>
                    </li>
                    <li class="cursor-pointer hover:bg-btnHover pt-3 pb-3 w-full  rounded-xl pl-5">
                        <div class="flex gap-2.5">
                            <img :src="Hospital" alt="">
                            <span>Doctors</span>
                        </div>
                    </li>
                    <li class="cursor-pointer hover:bg-btnHover pt-3 pb-3 w-full rounded-xl pl-5">
                        <div class="flex gap-2.5">
                            <img :src="Users" alt="">
                            <span>Patients</span>
                        </div>
                    </li>
                </ul>
                <ul class="flex flex-col gap-2">
                    <li class="cursor-pointer hover:bg-btnHover w-full pt-3 pb-3 rounded-xl pl-5 ">
                        <div class="flex gap-2.5">
                            <img :src="Gear" alt="">
                            <span>Settings</span>
                        </div>
                    </li>
                    <div class="border-b-1 border-borderBottom"></div>
                    <li class="cursor-pointer hover:bg-red-100 w-full pt-3 pb-3 rounded-xl pl-5">
                        <div class="flex gap-2.5">
                            <img :src="SignOut" alt="">
                            <span class="text-rose-800">Log out</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
</template>