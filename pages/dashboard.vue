<script setup lang="ts">
// @ts-ignore
import type { ConsumedFood, RedeemedReward } from '~/server/utils/entityTypes';

const { data } = useAuth();
await refreshData(data.value?.user?.email!)
if(loggedInUser.value == -1) {
    navigateTo('/login')
}

// NOTE WITH DATES: JANUARY STARTS AT 0, DECEMBER AT 11

    // @ts-ignore
    let loggedFoods:ConsumedFood = [
        {
            'cFoodID' : 1,
            'dateOfConsumption' : new Date(2023, 11, 29),
            'uID' : 1,
        },
        {
            'cFoodID' : 2,
            'dateOfConsumption' : new Date(2024, 0, 3),
            'uID' : 1,
        },{
            'cFoodID' : 3,
            'dateOfConsumption' : new Date(2024, 1, 14),
            'uID' : 1,
        },
        {
            'cFoodID' : 4,
            'dateOfConsumption' : new Date(2024, 2, 20),
            'uID' : 1,
        }
    ]

    let redeemed:RedeemedReward = [
        {
            'reedemID' : 1,
            'date' : new Date(2024, 0, 22),
            'uID' : 1,
        }
    ]

    const printUser = () => {
        console.log(data.value)
    }

</script>

<template>
    <div class="p-5 bg-gradient-to-b from-bone-50 to-white">
        <h1 class="font-museoModerno text-lg">
            Dashboard - Welcome {{ data?.user?.name }}
        </h1>
        <v-btn @click="printUser()">Get LoggedInUser</v-btn>
        <!-- Panel for logging food/fruits. Admins have button to add and throw out/ delete items -->
        <Food />

        <!-- Panel for redeeming rewards based on points. Admins have an option to create new rewards, activate/deactivate, delete -->
        <Reward />

        <!--Logged foods history -->
        <div class="my-8 w-full shadow-xl">
            <div class = "flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                <h1 class="font-museoModerno">Logged Foods</h1>
            </div>
            <div  class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
                <div class="flex flex-row overflow-y-auto mx-2">
                    <div v-for="lFood in loggedFoods">
                        <LFCard :food="lFood" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Redeemed rewards history -->
        <div class="my-8 w-full shadow-xl">
            <div class = "flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                <h1 class="font-museoModerno">Redeemed Rewards</h1>
            </div>
            <div  class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
                <div class="flex flex-row overflow-y-auto mx-2">
                    <div v-for="rr in redeemed">
                        <RRCard :reward="rr" />
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>