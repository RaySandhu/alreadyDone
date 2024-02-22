<template>
    <div>
        <h2 style=" margin-top: 10px; margin-bottom: 10px;">
            Get testing
        </h2>
        <div>
            <v-btn @click="printHouseholds()">
                Get All Households
            </v-btn>
            <v-btn @click="printUsers()">
                Get All Users
            </v-btn>
            <v-btn @click="printFood()">
                Get All Food
            </v-btn>
            <v-btn @click="printRewards()">
                Get All Rewards
            </v-btn>
            <v-btn @click="printTrash()">
                Get All Trash
            </v-btn>
        </div>
        <div style="margin-top: 10px;">
            <v-btn @click="getSpecificHH(1)">
                Get Specific Household - 1
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Post testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="createHousehold()">
                Create Household
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Delete testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="deleteHousehold(1)">
                Delete Household
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
const householdData = ref();
const userData = ref();
const foodData = ref();
const rewardsData = ref();
const trashData = ref();

const fetchHouseholdData = async () => {
    const response = await $fetch('/api/household/0');
    householdData.value = response
};
const fetchUserData = async () => {
    const response = await $fetch('/api/user', {method : 'get'});
    userData.value = response
};
const fetchFoodData = async () => {
    const response = await $fetch('/api/food', {method : 'get'});
    foodData.value = response
};
const fetchRewardsData = async () => {
    const response = await $fetch('/api/rewards', {method : 'get'});
    rewardsData.value = response
};
const fetchTrashData = async () => {
    const response = await $fetch('/api/trashBin', {method : 'get'});
    trashData.value = response
};

const printHouseholds = async () => {
    await fetchHouseholdData()
    console.log(householdData.value.data)
}
const printUsers = async () => {
    await fetchUserData()
    console.log(userData.value!.data)
}
const printFood = async () => {
    await fetchFoodData()
    console.log(foodData.value!.data)
}
const printRewards = async () => {
    await fetchRewardsData()
    console.log(rewardsData.value!.data)
}
const printTrash = async () => {
    await fetchTrashData()
    console.log(trashData.value!.data)
}

const getSpecificHH = async (id : number) => {
    const response = await $fetch(`/api/household/${id}`);
    householdData.value = response
    console.log(householdData.value)
}

async function createHousehold() {
  const res = await $fetch('/api/household/create', {
    method: 'post',
    body: {}
  })
  console.log(res)
}

async function deleteHousehold(id : number) {
  const res = await $fetch(`/api/household/${id}`, {
    method: 'delete',
  })
  console.log(res)
}

</script>