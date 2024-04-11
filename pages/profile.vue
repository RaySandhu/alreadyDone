<script setup lang="ts">
import { loggedInUser } from '~/utils/fetchData';

    const { data } = useAuth();
    await fetchLoggedInUser(data.value?.user?.email!);
    if(loggedInUser.value == -1) {
        navigateTo('/register')
    }
    await refreshData(data.value?.user?.email!)

    const firstUser = loggedInUser.value[0];
    const HName = currentHouse.value.data[0].Name;
    const numRewards = obtainedRewardData.value.length || 0;
    const numFood = consumedFoodData.value.length || 0;

    const profilePic = data.value?.user?.image;
    const name = ref("");
    name.value = firstUser['Fname'];
    const lName = ref("");
    lName.value = firstUser['Lname'];
    const year: Ref<number | undefined>= ref();
    year.value = firstUser["DOB"].split('-')[0];
    const month: Ref<number | undefined> = ref();
    month.value = firstUser["DOB"].split('-')[1];
    const day: Ref<number | undefined> = ref();
    day.value = firstUser["DOB"].split('-')[2].split('T')[0];

    const del = ref(false);
    const delUser = async () => {
            del.value = false;
            deleteUser(firstUser['User-ID']);
            navigateTo('/register');
    };

    const swi = ref(false);
    const switchUser = async () => {
            swi.value = false;
            const porc = firstUser['PorC-Flag'] == "P";
            const tempUpdate : User = {
                uID: firstUser['User-ID'],
                fName: firstUser['Fname'],
                lName: firstUser['Lname'],
                dob: firstUser['DOB'],
                pointsEarned: firstUser['Points earned'],
                googleAuth: firstUser['googleAuth'],
                PorCFlag: porc ? 0 : 1,
                hID: firstUser['H-ID']
            }
            updateUser(tempUpdate);
            firstUser['PorC-Flag'] = porc ? "":"P";
    }

    const editProfile = ref(false);
    const edit = async () => {
        editProfile.value = false;
        const tempUpdate : User = {
            uID: firstUser['User-ID'],
            fName: name.value,
            lName: lName.value,
            dob: new Date(`${year.value}-${month.value}-${day.value}`),
            pointsEarned: firstUser['Points earned'],
            googleAuth: firstUser['googleAuth'],
            PorCFlag: firstUser['PorC-Flag'],
            hID: firstUser['H-ID']
        }
        updateUser(tempUpdate);
        firstUser['Fname'] = tempUpdate.fName;
        firstUser['Lname'] = tempUpdate.lName;
        tempUpdate.dob.setDate(tempUpdate.dob.getDate()+1);
        firstUser['DOB'] = tempUpdate.dob.toLocaleDateString();
    }
</script>

<template :key="firstUser">
    <div class="bg-gradient-to-b from-bone-100 to-white p-5 flex flex-col">
        <div class="flex flex-row align-center mt-4">
            <h1 class="font-museoModerno text-blue text-3xl">
                PROFILE
            </h1>
            <!-- Add some kind of edit button here to edit personal information -->
            <v-btn class="mx-3 ml-auto text-blue" variant="text" size="medium" density="compact" icon="mdi-pencil" @click="editProfile = true"></v-btn>
        </div>
        <div class="mb-5 h-1 w-full bg-amour-200 shadow-md rounded-lg"></div>
        <!-- Profile picture from google auth can go here (Name beside it)-->
        <div class="my-4 flex flex-row align-center">
            <img class="h-12 align-self-start mr-5 img-thumbnail rounded-circle" :src="profilePic!" alt="Profile pic">
            <h2 class="font-museoModerno text-amour-300 text-2xl">
                {{ firstUser['Fname'] }} {{ firstUser['Lname'] }}
            </h2>
        </div>
        <div class="font-museoModerno text-blue text-xl">
            <!-- Adult vs Child status -->
            <h1 v-if="firstUser['PorC-Flag'] == 'P'">
                Parent User
            </h1>
            <h1 v-if="firstUser['PorC-Flag'] == ''">
                Child User
            </h1>
            <!-- Birth date -->
            <h1>
                Birthdate: {{firstUser["DOB"].split('T')[0]}}
            </h1>
            <!-- House hold -->
            <h1>
                Household: {{ HName }}
            </h1>
            <!-- Number of points
            <h1>
                Number of points aquired by user: {{  firstUser['Points earned'] }}
            </h1> -->
            <!-- Number of rewards redeemed
            <h1>
                Lifetime rewards redeemed: {{ numRewards }}
            </h1> -->
            <!-- Number of food items logged 
            <h1>
                Lifetime foods logged: {{ numFood }}
            </h1> -->
        </div>
        <div class="mt-10 w-full flex flex-col">
            <!-- Button to change from child to adult (or vice versa) -->
            <v-btn class="my-5" @click="swi = true"> Change to Adult/Child </v-btn>
            <!-- Button to permanently delete user. Must have warning that you cannot undo. -->
            <v-btn color="red" @click="del = true"> Delete User </v-btn>
        </div>
    </div>

    <!-- Pop ups -->
    <v-dialog v-model="editProfile">
        <div class="flex justify-center align-center">
                <v-card>
                    <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Edit Food </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <form class="flex flex-col">
                                <p class="font-museoModerno mt-4"> First Name: </p>
                                <input v-model="name" placeholder="Jane" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Last Name: </p>
                                <input v-model="lName" placeholder="Doe" class="hover:bg-gray-200 px-2"/>
                                <p class="font-museoModerno mt-4"> Birthdate (YYYY/MM/DD): </p>
                                <div class="flex flex-row mx-auto">
                                    <input v-model="year" placeholder="YYYY" class="hover:bg-gray-200 w-20 px-2"/>
                                    <input v-model="month" placeholder="MM" class="hover:bg-gray-200 w-12 px-2"/>
                                    <input v-model="day" placeholder="DD" class="hover:bg-gray-200 w-12 px-2"/>
                                </div>
                            </form>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="editProfile = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="edit()">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
    </v-dialog>
    <v-dialog v-model="swi">
        <div class="flex justify-center align-center">
            <v-card>
                <v-card-item>
                        <div class="flex flex-col justify-center align-center">
                            <h1 class="text-3xl text-money-300 font-museoModerno mr-auto"> Confirm </h1>
                            <div class="h-1 w-full my-2 bg-money-100"></div>
                            <p> Change to Parent/Child? </p>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="swi = false">
                            Cancel
                        </v-btn>
                        <v-btn color="green" variant="flat" @click="switchUser()">
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
                            <p> Are you sure you want to delete your profile? This action <b>CANNOT</b> be undone</p>
                        </div>
                    </v-card-item>
                    <v-card-actions class="flex justify-end align-center">
                        <v-btn @click="del = false">
                            Cancel
                        </v-btn>
                        <v-btn color="red" variant="flat" @click="delUser()">
                            DELETE
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </div>
    </v-dialog>
</template>