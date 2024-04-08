<template>
    <div>
        <v-btn @click="refreshData(data!.user?.email!)">
                Refresh Cached Data
        </v-btn>
        <v-btn @click="printCurrentUser()"> Get LoggedInUser </v-btn>

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
            <v-btn @click="throwTrash(5, testUpdateFood, testUpdateUser)">
                Throw Trash
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
                <v-btn @click="consumeFood(testUpdateFood, testUpdateUser)">
                    Consume Food Item ID 1
                </v-btn>
                <v-btn @click="obtainReward(testUpdateReward, testUpdateUser)">
                    Obtain Reward ID 1
                </v-btn>
            </div>
            <div>
                <v-btn @click="printObtainedRewards">
                    List all Rewards Obtained by User ID 5
                </v-btn>
                <v-btn @click="printConsumedFood">
                    List all Food Consumed by User ID 5
                </v-btn>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
// calling this at the start of our application can cache all the data we will query to make things faster.
const { data } = useAuth();

await refreshData(data.value?.user?.email!)
if(loggedInUser.value == -1) {
    navigateTo('/login')
}

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
    'uID'           : null,
    'fName'         : 'Joe',
    'lName'         : 'Shmoe',
    'dob'           : new Date('1998-06-25'),
    'pointsEarned'  : 0,
    'googleAuth'    : 'TestGoogle',
    'PorCFlag'      : 1,
    'hID'           : 5,
}
// Update these values to see the changes in user 5
const testUpdateUser:User = {
        "uID": 5,
        "fName": "Ray",
        "lName": "Sandhu",
        "dob": new Date('1998-06-25'),
        "pointsEarned": 0,
        "googleAuth": "TestGoogle",
        "PorCFlag": 1,
        "hID": 5
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

const testCreateConsumedFood : ConsumedFood = {
    cFoodID: 20,
    dateOfConsumption : new Date(),
    uID : 5
}

const testCreateObtainedReward : ObtainedReward = {
    redeemID: 1,
    date : new Date(),
    uID : 5
}

const testThrowFood : TrashBin = {
    'binID' : 5,
    'hID' : 5,
    'fID' : 20,
    'uID' : 5,
    'dateDiscarded' : new Date()
}

const printCurrentUser = () => {
        console.log(loggedInUser.value)
    }

const printHouseholds = () => {
    console.log(householdData.value.data)
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
const printConsumedFood = () => {
    console.log(consumedFoodData.value!.data)
}

const printObtainedRewards = () => {
    console.log(obtainedRewardData.value!.data)
}

const printTrash = () => {
    console.log(trashData.value!.data)
}

</script>