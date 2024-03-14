<template>
    <div class="fixed flex flex-shrink-0 h-16 w-screen max-w-full z-10 bg-gradient-to-b from-white to-orange-50 shadow-md border-b-2 border-red-200">
        <div class="flex h-16 items-center">
            <!-- Logo and Name (not in mobile view) + Menu Hamburger for the main side bar (mobile view)-->
            <nuxt-icon name="AlreadyDoneLogo" class="text-5xl text-amour-300 mx-3" />
            <h1 class="hidden md:block font-museoModerno text-amour-200">
                Already Done
            </h1>
        </div>
        <div>
            <!-- User points, Number of rewards redeemed, User name, Household name-->
            
        </div>
        <div class="ml-auto items-center">
            <!-- Always accessable signout button in the corner (may remove later if I don't like here)-->
            <v-btn @click="signOut()" class="m-3 h-10">
                Sign Out
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
    const { signOut } = useAuth()
</script>