<script setup lang="ts">

    const { data } = useAuth();
    await fetchLoggedInUser(data.value?.user?.email!);
    if(loggedInUser.value == -1) {
        navigateTo('/register')
    }
    await refreshData(data.value?.user?.email!)

    const parent = ref(true);
    const houseHold = ref("");
    const houseName = ref("");

    const createH = ref(false);

    const swi = ref(false);
    const switchHouse = async () => {
        swi.value = false;
        console.log("Switch household");
    }

    const del = ref(false);
    const delHouse = async () => {
        del.value = false;
        console.log("delete household");
    }

</script>

<template>
    <div class="bg-gradient-to-b from-bone-100 to-white p-5 flex flex-col">
        <div class="flex flex-row align-center mt-4">
            <h1 class="font-museoModerno text-blue text-3xl">
                HOUSEHOLD
            </h1>
        </div>
        <div class="mb-5 h-1 w-full bg-amour-200 shadow-md rounded-lg"></div>
        <!-- Profile picture from google auth can go here (Name beside it)-->
        <h1 class="font-museoModerno text-amour-200"> Household Members: </h1>
        <div class="font-museoModerno text-blue text-xl">
            Household Users...
        </div>
        <div class="mt-10 w-full flex flex-col">
            <!-- Button to change which househole you are in -->
            <v-btn class="my-5" @click="swi = true"> Change Household </v-btn>
            <!-- Button to permanently delete household (and all users inside). Must have warning that you cannot undo. -->
            <v-btn color="red" @click="del = true"> Delete Household and Users </v-btn>
        </div>
    </div>

    <!-- Popups -->
    <v-dialog v-model="swi">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                    <div v-if="!createH" class="w-1000 flex flex-col">
                        <p class="font-museoModerno mb-2 mt-4">Household ID:</p>
                        <input v-model="houseHold" placeholder="House ID" class="hover:bg-gray-200 px-2 mb-2" />
                    
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