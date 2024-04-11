<script setup lang="ts">
// @ts-ignore
import type { ConsumedFood, RedeemedReward } from '~/server/utils/entityTypes';
import { refreshData, foodData, rewardsData, consumedFoodData, obtainedRewardData } from '../utils/fetchData'

    const { data } = useAuth();
    await fetchLoggedInUser(data.value?.user?.email!);
    if(loggedInUser.value == -1) {
        navigateTo('/register')
    }
    await refreshData(data.value?.user?.email!)
</script>

<template>
    <div class="p-5 bg-gradient-to-b from-bone-50 to-white">
        <!-- Panel for logging food/fruits. Admins have button to add and throw out/ delete items -->
        <Food />

        <!-- Panel for redeeming rewards based on points. Admins have an option to create new rewards, activate/deactivate, delete -->
        <Reward />

        <!--Logged foods history -->
        <div class="my-8 w-full shadow-xl">
            <div class="flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                <h1 class="font-museoModerno">Logged Foods</h1>
            </div>
            <div class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
                <div class="flex flex-row overflow-y-auto mx-2">
                    <div v-for="lFood in consumedFoodData.data" :key="lFood['CFood-ID']">
                        <LFCard :food="{
                cFoodID: lFood['CFood-ID'],
                dateOfConsumption: lFood['Date of Consumption'],
                uID: lFood['U-ID']
            }" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Redeemed rewards history -->
        <div class="my-8 w-full shadow-xl">
            <div class="flex align-center px-2 bg-blue-300 h-10 rounded-tl-lg rounded-tr-lg">
                <h1 class="font-museoModerno">Redeemed Rewards</h1>
            </div>
            <div class="bg-blue h-64 w-full rounded-bl-lg rounded-br-lg">
                <div class="flex flex-row overflow-y-auto mx-2">
                    <div v-for="redReward in obtainedRewardData.data" :key="redReward['ReedemID']">
                        <RRCard :reward="{
                redeemID: redReward['ReedemID'],
                date: redReward['Date'],
                uID: redReward['U-ID']
            }" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>