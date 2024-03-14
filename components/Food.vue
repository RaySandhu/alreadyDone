<script setup lang="ts">
import FCard from '~/components/FCard.vue';
import type { Food } from '~/server/utils/entityTypes';

    type FormFeedbackType = 'incomplete';

    const { data } = useAuth();
    
    const addFood = ref(false);
    const name = ref('');
    const pointValue = ref('');
    const quantity = ref('');
    const formFeedback: Ref<FormFeedbackType> = ref(null);
    
    let newFood:Food = {
        'name' : name.value,
        'foodID' : null,
        'pointValue' : pointValue.value,
        'quantity' : quantity.value,
        'hID' : 1,
    }
    const submitFood = async () => {
        formFeedback.value='';

        if(!name.value.trim() || !pointValue.value.trim() || !quantity.value.trim()){
            formFeedback.value = 'incomplete';
            return;
        }

        newFood.name = name.value;
        newFood.pointValue = pointValue.value;
        newFood.quantity = quantity.value;

        name.value='';
        pointValue.value='';
        quantity.value='';
        
        addFood.value = false;
        console.log(newFood);
    }

    let tempFoods:Food = [{
        'name' : "bananas",
        'foodID' : 1,
        'pointValue' : 10,
        'quantity' : 1,
        'hID' : 1,
    },{
        'name' : "apples",
        'foodID' : 2,
        'pointValue' : 15,
        'quantity' : 1,
        'hID' : 1,
    },{
        'name' : "carrots",
        'foodID' : 3,
        'pointValue' : 5,
        'quantity' : 1,
        'hID' : 1,
    },{
        'name' : "brussel sprouts",
        'foodID' : 4,
        'pointValue' : 15,
        'quantity' : 1,
        'hID' : 1,
    },{
        'name' : "honeydue",
        'foodID' : 5,
        'pointValue' : 20,
        'quantity' : 1,
        'hID' : 1,
    }
    ];

</script>

<template>
    <div class="my-8 w-full shadow-xl">
            <div class = "flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                <h1 class="font-museoModerno">Log Food</h1>
                <v-btn class="ml-auto" size="small" density="compact" icon="mdi-plus" @click="addFood = true"></v-btn>
            </div>
            <div  class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
                <div class="flex flex-row overflow-y-auto mx-2">
                    <div v-for="tempFood in tempFoods">
                        <FCard :food="tempFood" />
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="addFood">
            <div class="flex justify-center align-center">
                <v-card>
                    <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Add Food </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <form class="flex flex-col">
                                <p class="font-museoModerno mt-4"> Food Name: </p>
                                <input v-model="name" placeholder="bananas" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Point Value: </p>
                                <input v-model="pointValue" placeholder="10" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Quantity: </p>
                                <input v-model="quantity" placeholder="1" class="hover:bg-gray-200 px-2"/>
                            </form>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="addFood = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="submitFood()">
                            Submit
                        </v-btn>
                    </v-card-actions>
                    <p class="flex justify-center align-center m-2 mt-0 text-sm text-bone-300">{{ formFeedback }}</p>
                </v-card>
            </div>
        </v-dialog>
</template>