<script setup lang="ts">
import type { Food } from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{ 
    food: Food
}>()

const { food } = props;

</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-64 bg-blue-100 text-black m-4 p-1 shadow-lg">
        <!-- delete/throw out button in top right corner only for parents -->
        <!-- Food name -->
        <div class="flex justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">Food Name: {{ food.FoodID }}</h2>
        </div>
        <!-- Button to redeem -->
        <button class="flex justify-center align-center bg-money-300 hover:bg-money-400 hover:shadow-md h-10 px-10 rounded-xl">
            <nuxt-icon name="Points" class="text-3xl text-white mt-1 mr-1" />
            <p class="text-lg text-white font-museoModerno"> {{ food.PointValue }} points </p>
        </button>
    </div>
</template>