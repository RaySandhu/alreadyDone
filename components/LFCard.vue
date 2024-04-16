<script setup lang="ts">
import type { ConsumedFood } from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{ 
    food: ConsumedFood
}>()

const { food } = props;

// Consumed food does not have a name value, can query to the orginal food if nessecary?
const foodInfo = await getFoodByID(food.cFoodID);
console.log("Food \n", foodInfo);

</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        
        <!-- Food name -->
        <div class="flex flex-col justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">{{ foodInfo.data[0]['Name'] }} </h2>
            <!-- Date added: YYYY-MM-DD -->
            <div class="text-center text-money-300">
                <p>Redeemed {{ food.dateOfConsumption.split('T')[0] }}</p>
                <p>For {{ foodInfo.data[0]['Point value'] }} Points</p>
            </div>
        </div>
    </div>
</template>