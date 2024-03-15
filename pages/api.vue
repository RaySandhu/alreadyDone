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
            <v-btn @click="getUserByID(5)">
                    Get Specific User - 5
            </v-btn>
            <v-btn @click="getAllUsersInHousehold(5)">
                    Get All Users in HouseHold 5
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Post testing
        </h2>
        <div style="margin-top: 10px;">
            <v-btn @click="createHousehold('TestHouse')">
                Create Household
            </v-btn>
            <v-btn @click="createUser(testCreateUser)">
                Create User
            </v-btn>
            <v-btn @click="createFood(testCreateFood)">
                Create Food
            </v-btn>
            <v-btn @click="createReward(testCreateReward)">
                Create Reward
            </v-btn>
        </div>
        <div>
            <v-btn @click="updateUser(testUpdateUser)">
                Update User
            </v-btn>
            <v-btn @click="updateFood(testUpdateFood)">
                Update Food
            </v-btn>
            <v-btn @click="updateReward(testUpdateReward)">
                Update Reward
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
            <v-btn @click="deleteReward(2)">
                Delete Reward - 2
            </v-btn>
        </div>
        <h2 style=" margin-top: 30px; margin-bottom: 10px;">
            Consume / Obtain Testing
        </h2>
        <div style="margin-top: 10px;">
            <div>
                <v-btn @click="">
                    Consume Food Item ID 1
                </v-btn>
                <v-btn @click="">
                    Obtain Reward ID 1
                </v-btn>
            </div>
            <div>
                <v-btn @click="">
                    List all Rewards Obtained by User ID 5
                </v-btn>
                <v-btn @click="">
                    List all Food Consumed by User ID 5
                </v-btn>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
// calling this at the start of our application can cache all the data we will query to make things faster.
await refreshData()
// !!! Should store a householdID in state for currently logged in user.

const testCreateReward : Reward = {
    'rID' : null,
    'name' : 'Ice Cream',
    'pointsNeeded' : 25,
    'description' : 'Put ice cream in your mouth',
    'status' : 1,
    'hID' : 5,
}

const testUpdateReward : Reward = {
    'name': 'Ice Cream',
    'pointsNeeded': 12,
    'description': 'Put ice cream in your mouth',
    'status': 0,
    'rID': 1,
    'hID': 5
}

// Create a new user in Household 5
const testCreateUser:User = {
    'uID'       : null,
    'fName'         : 'Joe',
    'lName'         : 'Shmoe',
    'dob'           : new Date('1998-06-25'),
    'pointsEarned' : 0,
    'googleAuth'   : 'TestGoogle',
    'PorCFlag'     : 'P',
    'hID'          : 5,
}
// Update these values to see the changes in user 6
const testUpdateUser:User = {
    'uID'           : 6,
    'fName'         : 'Joe',
    'lName'         : 'Test',
    'dob'           : new Date('1998-06-25'),
    'pointsEarned' : 10,
    'googleAuth'   : 'TestGoogle',
    'PorCFlag'     : 'P',
    'hID'          : 5,
}

const testCreateFood : Food = {
    'name': 'Banana',
    'fID': null,
    'pointValue': 20,
    'quantity': 10,
    'hID': 5,
}

const testUpdateFood : Food = {
    'name': 'Ice Cream',
    'fID' : 20,
    'pointValue' : 20,
    'quantity' : 9,
    'hID' : 5,
}

// const consumingUser : User = await getUserByID.data[0]
// const consumedFoodInfo : Food = await getFoodByID.data[0]


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