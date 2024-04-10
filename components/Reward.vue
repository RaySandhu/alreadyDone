<script setup lang="ts">
import type { Reward } from '~/server/utils/entityTypes';
import { loggedInUser, rewardsData } from '../utils/fetchData';


type FormFeedbackType = 'incomplete' | 'success' | 'error' | null;

const { data } = useAuth();

const addReward = ref(false);
const name = ref('');
const pointsNeeded = ref('');
const description = ref('');
const status = ref('')
const formFeedback: Ref<FormFeedbackType> = ref(null);

const firstUser = loggedInUser.value[0];
const HID = firstUser['H-ID'];

const submitReward = async () => {
    formFeedback.value = null;

    if (!name.value.trim() || !pointsNeeded.value.trim() || !description.value.trim()) {
        formFeedback.value = 'incomplete';
        return;
    }

    //create reward object to be passed into create reward
    const newReward: Reward = {
        rID: null,
        name: name.value,
        pointsNeeded: Number(pointsNeeded.value),
        description: description.value,
        status: Number(status.value), // Adjust based on your status field type
        hID: HID,
    };

    try {
        await createReward(newReward);
        await refreshData(data.value?.user?.email!)
        formFeedback.value = 'success';
        // Clear the form
        name.value = '';
        pointsNeeded.value = '';
        description.value = '';
        status.value = '';
        addReward.value = false;
        console.log("Reward created successfully:", newReward);
    } catch (error) {
        console.error("Failed to create reward:", error);
        formFeedback.value = 'error';
    }
};



</script>

<template>
    <div class="my-8 w-full shadow-xl">
        <div class="flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
            <h1 class="font-museoModerno">Rewards</h1>
            <v-btn class="ml-auto" size="small" density="compact" icon="mdi-plus" @click="addReward = true"></v-btn>
        </div>
        <div class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
            <div class="flex flex-row overflow-y-auto mx-2">
                <div v-for="rewardItem in rewardsData.data" :key="rewardItem['Reward-ID']">
                    <RCard :reward="{
                rID: rewardItem['R-ID'],
                name: rewardItem.Name,
                pointsNeeded: rewardItem['Points needed'],
                description: rewardItem.Description,
                status: rewardItem.Status,
                hID: rewardItem['H-ID']
            }" />
                </div>
            </div>
        </div>
    </div>

    <v-dialog v-model="addReward">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                    <div class="flex flex-col justify-center align-center">
                        <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Add Reward </h1>
                        <div class="h-1 w-full my-2 bg-money-100"></div>
                        <form class="flex flex-col">
                            <p class="font-museoModerno mt-4"> Reward Name: </p>
                            <input v-model="name" placeholder="movie" class="hover:bg-gray-200 px-2" />
                            <p class="font-museoModerno mt-4"> Point Value: </p>
                            <input v-model="pointsNeeded" placeholder="100" class="hover:bg-gray-200 px-2" />
                            <p class="font-museoModerno mt-4"> Description: </p>
                            <textarea v-model="description" placeholder="description here"
                                class="hover:bg-gray-200 px-2"></textarea>
                        </form>
                    </div>
                </v-card-item>
                <v-card-actions class="flex justify-end align-center">
                    <v-btn @click="addReward = false">
                        Cancel
                    </v-btn>
                    <v-btn color="green" variant="flat" @click="submitReward()">
                        Submit
                    </v-btn>
                </v-card-actions>
                <p class="flex justify-center align-center m-2 mt-0 text-sm text-bone-300">{{ formFeedback }}</p>
            </v-card>
        </div>
    </v-dialog>
</template>