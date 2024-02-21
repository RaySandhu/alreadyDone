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
            <v-btn>
                Get Specific Household (Incomplete)
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Post testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="testCreateHoushold()">
                Create Household
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
// const { data } = await useFetch('/api/example')
const householdData = ref();
// const userData = ref(null);
// const foodData = ref(null);
// const rewardsData = ref(null);
// const trashData = ref(null);

// Note to self: looking to make data reactive once data has been updated. Likely solution is refresh page or rerun get requests after any update
const fetchHouseholdData = async () => {
    const response = await useFetch('/api/household', {method : 'get'});
    householdData.value = response.data.value
};
const { data : userData } = await useFetch('/api/user', {method : 'get'})
const { data : foodData } = await useFetch('/api/food', {method : 'get'})
const { data : rewardsData } = await useFetch('/api/rewards', {method : 'get'})
const { data : trashData } = await useFetch('/api/trashBin', {method : 'get'})

const printHouseholds = () => {
    fetchHouseholdData()
    console.log(householdData.value)
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
  const { body } = await $fetch('/api/household', {
    method: 'post',
    body: { test: 123 }
  })
  console.log(body)
}

</script>