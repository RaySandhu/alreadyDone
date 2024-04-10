<script setup lang="ts">
import type { log } from 'console';


    const { data } = useAuth();

    await fetchLoggedInUser(data.value?.user?.email!);
    if(loggedInUser.value == -1) {
        navigateTo('/register')
    }
    await refreshData(data.value?.user?.email!)

    let firstUser = loggedInUser.value[0];
    let HName = currentHouse.value.data[0].Name;
    let users = userData.value.data;

    const parent = ref(firstUser['PorC-Flag'] == 'P');
    const householdID = ref();
    const houseInfo = ref();
    const houseName = ref("");

    const formFeedback: Ref<String> = ref('');
    const createH = ref(false);

    const swi = ref(false);
    const switchHouse = async () => {
        if(createH.value){ //Household being created
            if(!houseName.value.trim()){
                formFeedback.value = 'Please provide a Household Name';
                return;
            }
    // @ts-ignore
            const temp = await createHousehold(houseName.value.trim()).then(res => res.data);
            householdID.value = temp.insertId;
            console.log(householdID.value);
        }
        else{
    // @ts-ignore
            if(householdID.value == undefined){
                formFeedback.value = 'Please provide an ID number';
                return;
            }
            houseInfo.value = await getSpecificHousehold(householdID.value).then(res => res.data) // needs to be a ref for reactive data

            if(houseInfo.value == undefined){
                console.log(houseInfo.value)
                formFeedback.value = 'Invalid Household ID\nTry Again';
                return;
            } else {
                console.log(houseInfo.value)
                householdID.value = houseInfo.value[0]['House-ID']
                houseName.value = houseInfo.value[0].Name
            }
        }
        const tempUpdate : User = {
            uID: firstUser['User-ID'],
            fName: firstUser['Fname'],
            lName: firstUser['Lname'],
            dob: firstUser['DOB'],
            pointsEarned: firstUser['Points earned'],
            googleAuth: firstUser['googleAuth'],
            PorCFlag: firstUser['PorC-Flag'],
            hID: householdID.value
        }
        swi.value = false;
        updateUser(tempUpdate);
        console.log("updated");
        await refreshData(data.value?.user?.email!);
        firstUser = loggedInUser.value[0];
        HName = currentHouse.value.data[0].Name;
        users = userData.value.data;
        console.log("Switch household");
    }

    const del = ref(false);
    const delHouse = async () => {
        del.value = false;
        deleteHousehold(firstUser['H-ID']);
        navigateTo('/register')
        console.log("delete household");
    }

</script>

<template>
    <div class="bg-gradient-to-b from-bone-100 to-white p-5 flex flex-col" :key="firstUser">
        <div class="flex flex-row align-center mt-4">
            <h1 class="font-museoModerno text-blue text-3xl">
                {{ HName }}
            </h1>
        </div>
        <div class="mb-5 h-1 w-full bg-amour-200 shadow-md rounded-lg"></div>
        <!-- Profile picture from google auth can go here (Name beside it)-->
        <h1 class="font-museoModerno text-blue mb-5"> Household code: {{ firstUser['H-ID'] }} </h1>
        <h1 class="font-museoModerno text-amour-200 text-lg"> Household Members: </h1>
        <div v-for="user in users" class="flex flex-row align-center font-museoModerno text-blue">
            {{ user['Fname'] }} {{ user['Lname']}} - 
            <nuxt-icon name="Points" class="mt-1 ml-2" />
            <h1> {{ user['Points earned'] }} </h1>
        </div>
        <div class="mt-10 w-full flex flex-col">
            <!-- Button to change which househole you are in -->
            <v-btn class="my-5" @click="swi = true"> Change Household </v-btn>
            <!-- Button to permanently delete household (and all users inside). Must have warning that you cannot undo. -->
            <v-btn v-if="parent" color="red" @click="del = true"> Delete Household and Users </v-btn>
        </div>
    </div>

    <!-- Popups -->
    <v-dialog v-model="swi">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                    <div v-if="!createH" class="w-1000 flex flex-col">
                        <p class="font-museoModerno mb-2 mt-4">Household ID:</p>
                        <input v-model="householdID" placeholder="House ID" class="hover:bg-gray-200 px-2 mb-2" />
                    
                        <div v-if="parent" class="flex justify-center items-center">
                            <v-btn @click="createH=true">
                                Create New Household
                        </v-btn>
                        </div>
                    </div>
                    <div v-if="createH" class="w-1000 flex flex-col">
                        <p class="font-museoModerno mb-2 mt-4">Enter Household name:</p>
                        <input v-model="houseName" placeholder="Household name" class="hover:bg-gray-200 px-2 mb-2" />
                    
                        <div class="flex justify-center items-center">
                            <v-btn @click="createH=false">
                                Cancel
                            </v-btn>
                        </div>
                    </div>
                    <p class="text-sm text-red">{{ formFeedback }}</p>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="swi = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="switchHouse()">
                            Switch
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
    <v-dialog v-model="del">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Confirm </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <p> Are you sure you want to delete this household and <b>ALL</b> users in it? 
                                This action <b>CANNOT</b> be undone</p>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="del = false">
                            Cancel
                        </v-btn>
                        <v-btn color="red" variant="flat" @click="delHouse()">
                            DELETE
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</template>