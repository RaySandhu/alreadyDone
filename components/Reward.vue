<script setup lang="ts">
import type { Reward } from '~/server/utils/entityTypes';


    type FormFeedbackType = 'incomplete' | 'success' | null;

    const { data } = useAuth();
    
    const addReward = ref(false);
    const name = ref('');
    const pointsNeeded = ref('');
    const description = ref('');
    const status = ref('')
    const formFeedback: Ref<FormFeedbackType> = ref(null);
    
    let newReward:Reward = {
        'rID' : null,
        'name' : name.value,
        'pointsNeeded' : Number(pointsNeeded.value),
        'description' : description.value,
        'status' : Number(status.value),
        'hID' : 1,
    }
    const submitReward = async () => {
        formFeedback.value= null;

        if(!name.value.trim() || !pointsNeeded.value.trim() || !description.value.trim() || !status.value.trim()){
            formFeedback.value = 'incomplete';
            return;
        }

        formFeedback.value = 'success'

        addReward.value = false;
        console.log(newReward);
    }

    let tempRewards:Reward = [
        {
            'rID' : 1,
            'name' : "Movie",
            'pointsNeeded' : 500,
            'description' : "Redeemable for 1 movie trip.",
            'status' : 0,
            'hID' : 1,
        },{
            'rID' : 2,
            'name' : "Chocolate Bar",
            'pointsNeeded' : 50,
            'description' : "Redeemable for one chocolate bar to eat.",
            'status' : 0,
            'hID' : 1,
        }
    ]

</script>

<template>
    <div class="my-8 w-full shadow-xl">
        <div class = "flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
            <h1 class="font-museoModerno">Rewards</h1>
            <v-btn class="ml-auto" size="small" density="compact" icon="mdi-plus" @click="addReward = true"></v-btn>
        </div>
        <div  class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
            <div class="flex flex-row overflow-y-auto mx-2">
                <div v-for="tempReward in tempRewards">
                    <RCard :reward="tempReward" />
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
                            <input v-model="name" placeholder="movie" class="hover:bg-gray-200 px-2"/>
                            <p class="font-museoModerno mt-4"> Point Value: </p>
                            <input v-model="pointsNeeded" placeholder="100" class="hover:bg-gray-200 px-2"/>
                            <p class="font-museoModerno mt-4"> Description: </p>
                            <textarea v-model="description" placeholder="description here" class="hover:bg-gray-200 px-2"></textarea>
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