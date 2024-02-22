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
            <v-btn @click="getSpecificHousehold(5)">
                Get Specific Household - 1
            </v-btn>
            <v-btn @click="getSpecificUser(5,5)">
                    Get Specific User - 5, 5
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Post testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="createHousehold()">
                Create Household
            </v-btn>
            <v-btn @click="createUser('Ray', 'Sandhu', new Date('1998-06-25'), 'TestGoogle', 'P', 5)">
                Create User
            </v-btn>
            
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Delete testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="deleteHousehold(2)">
                Delete Household
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
// calling this at the start of our application can cache all the data we will query to make things faster.
await refreshData()

const printHouseholds = async () => {
    // await fetchHouseholdData()
    console.log(householdData.value.data)
}
const printUsers = async () => {
    // await fetchUserData()
    console.log(userData.value!.data)
}
const printFood = async () => {
    // await fetchFoodData()
    console.log(foodData.value!.data)
}
const printRewards = async () => {
    // await fetchRewardsData()
    console.log(rewardsData.value!.data)
}
const printTrash = async () => {
    // await fetchTrashData()
    console.log(trashData.value!.data)
}

</script>