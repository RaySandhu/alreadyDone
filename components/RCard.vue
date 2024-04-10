<script setup lang="ts">
import type { Reward, User } from '~/server/utils/entityTypes';
import { loggedInUser, rewardsData } from '../utils/fetchData';
// Use: import 1 reward from DB connection for this component

type FormFeedbackType = 'incomplete' | 'success' | 'error' | null;

const props = defineProps<{
  reward: Reward,
  user: User
}>()



const isOpen = ref(false);
const del = ref(false);
const edit = ref(false);
const formFeedback: Ref<FormFeedbackType> = ref(null);


const name = computed(() => props.reward.name);
const reward = computed(() => props.reward);
const pointsNeeded = computed(() => props.reward.pointsNeeded);
const editableReward = ref({} as Reward);

function openEditDialog() {
  editableReward.value = JSON.parse(JSON.stringify(props.reward));
  edit.value = true;
}

const logReward = async () => {
    formFeedback.value = null;
    console.log(reward.value.rID, 'rewarddd id');
    isOpen.value=false;



    try {
        
        const newReward: Reward = {
        rID: reward.value.rID,
        name: reward.value.name,
        pointsNeeded: Number(pointsNeeded.value),
        description: reward.value.description,
        status: Number(reward.value.status), 
        hID: reward.value.hID
        };

    


      
    
        console.log(reward.value.rID, 'hiya')
        console.log(loggedInUser.value[0]['User-ID'], 'yello')
        console.log(newReward, 'awesome')
        await obtainReward(newReward, loggedInUser.value[0]);

    

        formFeedback.value = 'success';
        console.log("Reward logged:", reward.value);
        console.log("User:", loggedInUser.value[0])
        
        // Optionally reset state or close modal
        isOpen.value = false;
    } catch (error) {
        console.error("Failed to log reward:", error);
        formFeedback.value = 'error';
    }
}

const delReward = async () => {
    try {
        const rewardToDelID = reward.value.rID

        const response = await deleteReward(rewardToDelID);
        console.log("Reward deleted:", response);
        

        formFeedback.value = 'success'; 
        del.value = false; 

    } catch (error) {
        console.error("Failed to delete reward:", error);
        formFeedback.value = 'error'; // Show error feedback to the user
    }
}

const editReward = async () => {
    formFeedback.value = null;
    console.log(reward.value.rID, 'rewarddd id');
    isOpen.value=false;



    try {
        
        const upReward: Reward = {
        rID: reward.value.rID,
        name: editableReward.value.name,
        pointsNeeded: Number(editableReward.value.pointsNeeded),
        description: reward.value.description,
        status: Number(reward.value.status), 
        hID: reward.value.hID
        };

    


      
    
        console.log(upReward.name, 'update!')
        console.log(upReward, 'upreward')
        await updateReward(upReward);

    

        formFeedback.value = 'success';
        console.log("Reward updated:", reward.value);
    
        
    
        isOpen.value = false;
    } catch (error) {
        console.error("Failed to update reward:", error);
        formFeedback.value = 'error';
    }
}

</script>

<template>
    <!-- component for displaying individual reward elements. (fixed width, height to parent container) -->
    <div class="flex flex-col justify-center align-center rounded-lg w-48 md:w-60 h-52 bg-blue-100 text-black m-4 mr-2 md:mr-4 p-1 shadow-lg">
        <!-- delete/throw out button in top right corner only for parents -->
        <div class="mr-2 ml-auto">
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-pencil" @click="edit = true"></v-btn>
            <v-btn class="mx-1 text-blue" variant="text" size="small" density="compact" icon="mdi-delete" @click="del = true"></v-btn>

        </div>
        <!-- Reward name -->
        <div class="flex flex-col justify-center align-center h-2/3">
            <h2 class="text-xl text-money-500">{{ reward.name }}</h2>
            <p class="text-sm text-money-300 px-3 text-center">{{ reward.description }}</p>
        </div>
        <!-- Button to redeem -->
        <button @click="isOpen = true" 
            class="flex justify-center align-center bg-money-300 hover:bg-money-400 hover:shadow-md h-10 px-5 md:px-10 mb-8 rounded-xl">
            <nuxt-icon name="Points" class="text-2xl md:text-3xl text-white mt-1 mr-1" />
            <p class="text-base md:text-lg text-white font-museoModerno"> - {{ reward.pointsNeeded }} points </p>
        </button>
    </div>
    <v-dialog v-model="isOpen">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                    <div class="flex flex-col justify-center align-center">
                        <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Confirm </h1>
                        <div class="h-1 w-full my-2 bg-money-100"></div>
                        <p> Redeem <b>{{ reward.name }}</b> for <b>{{ reward.pointsNeeded }}</b> points?</p>
                    </div>
                </v-card-item>
                <v-card-actions class="flex justify-end align-center">
                    <v-btn @click="isOpen = false">
                        Cancel
                    </v-btn>
                    <v-btn color="green" variant="flat" @click="logReward()">
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
                            <p> Throw away 1 <b>{{ reward.name }}</b>?</p>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="del = false">
                            Cancel
                        </v-btn>
                        <v-btn color="red" variant="flat" @click="delReward()">
                            Permanently Delete
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
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Edit Reward </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <form class="flex flex-col">
                                <p class="font-museoModerno mt-4"> Reward Name: </p>
                                <input v-model="editableReward.name" placeholder="bananas" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Point Value: </p>
                                <input v-model="editableReward.pointsNeeded" placeholder="10" class="hover:bg-gray-200 px-2"/>
                            </form>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="edit = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="editReward()">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
    </v-dialog>
</template>