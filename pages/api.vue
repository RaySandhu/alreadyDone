<template>
    <div>
        <v-btn @click="refreshData()">
                Refresh Cached Data
            </v-btn>
        <h2 style=" margin-top: 10px; margin-bottom: 10px;">
            Get testing for household 5
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
            <v-btn @click="getUsers(5,5)">
                    Get Specific User - 5, 5
            </v-btn>
            <v-btn @click="getUsers(5)">
                    Get All Users in HouseHold 5
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Post testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="createHousehold()">
                Create Household
            </v-btn>
            <v-btn @click="createUser(testCreateUser)">
                Create User
            </v-btn>
            <v-btn @click="createFood(testCreateFood)">
                Create Food
            </v-btn>
        </div>
        <div>
            <v-btn @click="updateUser(testUpdateUser)">
                Update User
            </v-btn>
            <v-btn @click="updateFood(testUpdateFood)">
                Update Food
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Delete testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="deleteHousehold(2)">
                Delete Household - 2
            </v-btn>
            <v-btn @click="deleteUser(2)">
                Delete User - 2
            </v-btn>
            <v-btn @click="deleteFood(21)">
                Delete Food - 21
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
// calling this at the start of our application can cache all the data we will query to make things faster.
await refreshData()

// Create a new user in Household 5
const testCreateUser:User = {
    'User-ID'       : null,
    'FName'         : 'Joe',
    'LName'         : 'Shmoe',
    'DOB'           : new Date('1998-06-25'),
    'Points earned' : 0,
    'Google Auth'   : 'TestGoogle',
    'PorC-Flag'     : 'P',
    'H-ID'          : 5,
}
// Update these values to see the changes in user 6
const testUpdateUser:User = {
    'User-ID'       : 6,
    'FName'         : 'Joe',
    'LName'         : 'Cigarette',
    'DOB'           : new Date('1998-06-25'),
    'Points earned' : 10,
    'Google Auth'   : 'TestGoogle',
    'PorC-Flag'     : 'P',
    'H-ID'          : 5,
}

const testCreateFood : Food = {
    'Food-ID' : null,
    'Point value' : 20,
    'Quantity' : 10,
    'Expiry date' : new Date(),
    'H-ID' : 5,
}

const testUpdateFood : Food = {
    'Food-ID' : 2,
    'Point value' : 20,
    'Quantity' : 9,
    'Expiry date' : new Date(),
    'H-ID' : 5,
}

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