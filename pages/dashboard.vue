<script setup lang="ts">
import FCard from '~/components/FCard.vue';
import type { Food } from '~/server/utils/entityTypes';

    const { data } = useAuth()

    let tempFood:Food = {
        'foodID' : 10,
        'pointValue' : 10,
        'quantity' : 1,
        'hID' : 1,
    };

</script>

<template>
    <div class="p-2 bg-bone-50">
        <h1>
            Dashboard
        </h1>
        <!-- Panel for logging food/fruits. Admins have button to add and throw out/ delete items -->
        <div class="my-8 w-full shadow-xl">
            <div class = "px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                Foods
            </div>
            <div class = "bg-blue h-64 w-full rounded-bl-lg rounded-br-lg flex flex-row">
                <FCard :food="tempFood" />
            </div>
        </div>

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