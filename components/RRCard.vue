<script setup lang="ts">
import type { ObtainedReward} from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{ 
    reward: ObtainedReward
}>()

const { reward } = props;




// Get reward name, description, point value,...etc. via query

</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        
        
        <!-- Food name -->
        <div class="flex flex-col justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">Reward ID - {{ reward.redeemID }} </h2>
            <!-- <p class="text-sm text-money-300 text-center p-2">Redeemed reward</p> -->
            <!-- Date added: YYYY-MM-DD -->
            <div class="text-center text-money-300">
                <!-- <p>Redeemed {{ reward.date.toLocaleDateString() }}</p> -->
                <!-- <p>For xxx Points</p> -->
            </div>
        </div>
    </div>
</template>