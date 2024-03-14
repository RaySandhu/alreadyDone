<script setup lang="ts">
import type { Food } from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{ 
    food: Food
}>()

const { food } = props;
const isOpen = ref(false);

const logFood = async () => {
    console.log(food);
    isOpen.value=false;
}

</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        <!-- delete/throw out button in top right corner only for parents -->
        <div class="mr-2 ml-auto">
            <button class="rounded-xl text-lg hover:text-amour-300"><span aria-hidden="true">&times;</span></button>

        </div>
        <!-- Food name -->
        <div class="flex justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">{{ food.name }}</h2>
        </div>
        <!-- Button to redeem -->
        <button @click="isOpen = true" 
            class="flex justify-center align-center bg-money-300 hover:bg-money-400 hover:shadow-md h-10 px-5 md:px-10 mb-10 rounded-xl">
            <nuxt-icon name="Points" class="text-2xl md:text-3xl text-white mt-1 mr-1" />
            <p class="text-base md:text-lg text-white font-museoModerno"> + {{ food.pointValue }} points </p>
        </button>
    </div>
    <v-dialog v-model="isOpen">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                    <div class="flex flex-col justify-center align-center">
                        <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Confirm </h1>
                        <div class="h-1 w-full my-2 bg-money-100"></div>
                        <p> Redeem <b>{{ food.name }}</b> for <b>{{ food.pointValue }}</b> points?</p>
                    </div>
                </v-card-item>
                <v-card-actions class="flex justify-end align-center">
                    <v-btn @click="isOpen = false">
                        Cancel
                    </v-btn>
                    <v-btn color="green" variant="flat" @click="logFood()">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</template>