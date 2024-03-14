<template>
    <div class="fixed overflow-y-auto bg-amour-200 w-16 md:w-64 h-screen pt-10 pl-1">
        <!-- Links -->
        <div class="flex flex-col mt-10">
            <!-- Dashboard -->
            <button class="flex align-center text-bone-50 hover:text-amour-50 h-12">
                <nuxt-icon name="Apple" class="text-3xl mx-3" />
                <h1 class="hidden md:block">Dashboard</h1>
            </button>
            
            <!-- Household -->
            <button class="flex align-center text-bone-50 hover:text-amour-50 h-12">
                <nuxt-icon name="House" class="text-3xl mx-3" />
                <h1 class="hidden md:block">Household</h1>
            </button>
            <!-- Profile -->
            <button class="flex align-center text-bone-50 hover:text-amour-50 h-12">
                <nuxt-icon name="Profile" class="text-3xl mx-3" />
                <h1 class="hidden md:block">Profile</h1>
            </button>
            <!-- Settings -->
            <button class="flex align-center text-bone-50 hover:text-amour-50 h-12">
                <nuxt-icon name="Settings" class="text-3xl mx-3" />
                <h1 class="hidden md:block">Settings</h1>
            </button>
            <!-- Logout -->
            <button class="flex align-center text-bone-50 hover:text-amour-50 h-12">
                <nuxt-icon name="Logout" class="text-3xl mx-3" />
                <h1 class="hidden md:block">Logout</h1>
            </button>
        </div>
    </div>
</template>