<script setup lang="ts">
import type { Food } from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{ 
    food: Food
}>()

const { food } = props;
const isOpen = ref(false);
const del = ref(false);
const edit = ref(false);

const name = food.name;
const pointValue = food.pointValue;

const logFood = async () => {
    console.log(food);
    isOpen.value=false;
}

const delFood = async () => {
    del.value = false;
}

const editFood = async () => {
    edit.value = false;
}

</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        <!-- delete/throw out button in top right corner only for parents -->
        <div class="mr-2 ml-auto">
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-pencil" @click="edit = true"></v-btn>
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-delete" @click="del = true"></v-btn>

        </div>
        <!-- Food name -->
        <div class="flex justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">{{ food.name }}</h2>
        </div>
        <!-- Button to redeem -->
        <button @click="isOpen = true" 
            class="flex justify-center align-center bg-money-300 hover:bg-money-400 hover:shadow-md h-10 px-5 md:px-10 mb-2 rounded-xl">
            <nuxt-icon name="Points" class="text-2xl md:text-3xl text-white mt-1 mr-1" />
            <p class="text-base md:text-lg text-white font-museoModerno"> + {{ food.pointValue }} points </p>
        </button>
        <p class="text-gray-500 mb-2">{{ food.quantity }} left</p>
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
    <v-dialog v-model="del">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Confirm </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <p> Throw away 1 <b>{{ food.name }}</b>?</p>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="del = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="delFood()">
                            Throw Away
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
    <v-dialog v-model="edit">
        <div class="flex justify-center align-center">
                <v-card>
                    <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Edit Food </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <form class="flex flex-col">
                                <p class="font-museoModerno mt-4"> Food Name: </p>
                                <input v-model="name" placeholder="bananas" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Point Value: </p>
                                <input v-model="pointValue" placeholder="10" class="hover:bg-gray-200 px-2"/>
                            </form>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="edit = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="editFood()">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
    </v-dialog>
</template>