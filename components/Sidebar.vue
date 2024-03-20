<script setup lang="ts">
    const { signOut } = useAuth()

</script>

<template>
    <div class="fixed overflow-y-auto bg-amour-200 w-16 md:w-64 h-screen pt-10 pl-1">
        <!-- Links -->
        <div class="flex flex-col mt-10">
            <!-- Dashboard -->
            <v-btn class="flex justify-start align-center my-2" variant="text" color="white">
                <nuxt-icon name="Apple" class="text-3xl" />
                <h1 class="hidden md:block ml-1">Dashboard</h1>
            </v-btn>
            
            <!-- Household -->
            <v-btn class="flex justify-start align-center my-2" variant="text" color="white">
                <nuxt-icon name="House" class="text-3xl" />
                <h1 class="hidden md:block ml-1">Household</h1>
            </v-btn>
            <!-- Profile -->
            <v-btn class="flex justify-start align-center my-2" variant="text" color="white">
                <nuxt-icon name="Profile" class="text-3xl" />
                <h1 class="hidden md:block ml-1">Profile</h1>
            </v-btn>
            <!-- Settings -->
            <v-btn class="flex justify-start align-center my-2" variant="text" color="white">
                <nuxt-icon name="Settings" class="text-3xl" />
                <h1 class="hidden md:block ml-1">Settings</h1>
            </v-btn>
            <!-- Logout -->
            <v-btn class="flex justify-start align-center my-2" variant="text" color="white" @click="signOut()">
                <nuxt-icon name="LogOut" class="text-3xl" />
                <h1 class="hidden md:block ml-1">Logout</h1>
            </v-btn>
        </div>
    </div>
</template>