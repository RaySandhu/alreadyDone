<template>
    <div>
        <h2 style="background-color: blue;">
            Index Content
        </h2>
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
</template>

<script setup lang="ts">
// const { data } = await useFetch('/api/example')
const { data : householdData } = await useFetch('/api/household', {method : 'get'})
const { data : userData } = await useFetch('/api/user', {method : 'get'})
const { data : foodData } = await useFetch('/api/food', {method : 'get'})
const { data : rewardsData } = await useFetch('/api/rewards', {method : 'get'})
const { data : trashData } = await useFetch('/api/trashBin', {method : 'get'})

const printHouseholds = () => {
    console.log(householdData.value!.data)
}
const printUsers = () => {
    console.log(userData.value!.data)
}
const printFood = () => {
    console.log(foodData.value!.data)
}
const printRewards = () => {
    console.log(rewardsData.value!.data)
}
const printTrash = () => {
    console.log(trashData.value!.data)
}

async function testCreateHoushold() {
  const { body } = await useFetch('/api/household', {
    method: 'post',
    body: { test: 123 }
  })
}

</script>