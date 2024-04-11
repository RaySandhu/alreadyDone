<script setup lang="ts">
import type { Food, User } from '~/server/utils/entityTypes';
// Use: import 1 food from DB connection for this component

const props = defineProps<{
    food: Food,
}>()

// page data
const { data } = useAuth();
const { food } = props;

// model values
const isOpen = ref(false);
const del = ref(false);
const edit = ref(false);

// update values
const name = food.name;
const pointValue = food.pointValue;

const formFeedback: Ref<String> = ref("");
const isObtained = ref()
const editableFood = ref({} as Food);

// log the food item under current user into the database
const logFood = async () => {
    formFeedback.value = "";
    isOpen.value = false;

    try {
        
        const consumedResponse = await getConsumedFoodForUser(loggedInUser.value[0]['User-ID'], food.fID);
        isObtained.value = consumedResponse
        const alreadyConsumed = isObtained.value.data.some(consumedFood => consumedFood['CFood-ID'] === food.fID);
        if (alreadyConsumed) {

            console.warn("Food has already been consumed.");
            formFeedback.value = 'alreadyConsumed';

            isOpen.value = false;
            return;
        }

        const newFood: Food = {
            fID: food.fID,
            name: food.name,
            pointValue: food.pointValue,
            quantity: food.quantity,
            hID: food.hID
        };

        await consumeFood(newFood, loggedInUser.value[0]);

        // Refresh Data
        await refreshData(data.value?.user?.email!)
        formFeedback.value = 'success';

        // close modal
        isOpen.value = false;
    } catch (error) {
        console.error("Failed to consume food:", error);
        formFeedback.value = 'error';
    }
}

// delete food item from database. May change to just throw out in trash.
const delFood = async () => {
    try {
        const foodToDelID = food.fID

        const response = await deleteFood(foodToDelID);
        console.log("Reward deleted:", response);

        // Refresh data
        await refreshData(data.value?.user?.email!)
        formFeedback.value = 'success';
        del.value = false;

    } catch (error) {
        console.error("Failed to delete reward:", error);
        formFeedback.value = 'error';
    }
}

// edit the values of the current food item
const editFood = async () => {
    formFeedback.value = "";
    isOpen.value = false;

    try {
        const upFood: Food = {
            fID: food.fID,
            name: editableFood.value.name,
            pointValue: editableFood.value.pointValue,
            quantity: editableFood.value.quantity,
            hID: food.hID
        };

        await updateFood(upFood);
        console.log('refresh now')

        await refreshData(data.value?.user?.email!)
        formFeedback.value = 'success';

        edit.value = false;
        isOpen.value = false;

    } catch (error) {
        console.error("Failed to update food:", error);
        formFeedback.value = 'error';
    }
}
</script>

<template>
    <!-- component for displaying individual food elements. (fixed width, height to parent container) -->
    <div
        class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        <!-- delete/throw out button in top right corner only for parents -->
        <div class="mr-2 ml-auto">
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-pencil"
                @click="edit = true"></v-btn>
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-delete"
                @click="del = true"></v-btn>
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
        <!-- If food is already consumed, display red text -->
        <p v-if="formFeedback === 'alreadyConsumed'" class="text-red-500 text-center">Food has already been consumed</p>
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
                            <input v-model="editableFood.name" placeholder="bananas" class="hover:bg-gray-200 px-2" />
                            <p class="font-museoModerno mt-4"> Point Value: </p>
                            <input v-model="editableFood.pointValue" placeholder="10" class="hover:bg-gray-200 px-2" />
                            <p class="font-museoModerno mt-4"> Quantity: </p>
                            <input v-model="editableFood.quantity" type="number" min="0" placeholder="10"
                                class="hover:bg-gray-200 px-2" />
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