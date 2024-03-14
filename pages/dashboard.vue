<script setup lang="ts">

</script>

<template>
    <div class="p-5 bg-gradient-to-b from-bone-50 to-white">
        <h1 class="font-museoModerno text-lg">
            Dashboard
        </h1>
        <!-- Panel for logging food/fruits. Admins have button to add and throw out/ delete items -->
        <Food />

        <!-- Panel for redeeming rewards based on points. Admins have an option to create new rewards, activate/deactivate, delete -->
        <div class="my-8 bg-blue h-64 w-full rounded">
            <div class = "px-2 bg-blue-300 h-10 rounded-tl rounded-tr">
                Rewards
            </div>
            
        </div>

        <!--Logged foods history -->
        <div class="my-8 bg-blue h-64 w-full rounded">
            <div class = "px-2 bg-blue-300 h-10 rounded-tl rounded-tr">
                Logged Foods
            </div>
            
        </div>

        <!-- Redeemed rewards history -->
        <div class="my-8 bg-blue h-64 w-full rounded">
            <div class = "px-2 bg-blue-300 h-10 rounded-tl rounded-tr">
                Redeemed Rewards
            </div>
            
        </div>
        
    </div>
</template>