<script setup lang="ts">
    import { ref } from 'vue';

    const { data } = useAuth();

    type FormFeedbackType = 'incomplete' | 'invalid household ID' | 'invalid DOB' | 'success' | null;

    const name = ref('');
    const lName = ref('');
    const year: Ref<number | undefined>= ref();
    const month: Ref<number | undefined> = ref();
    const day: Ref<number | undefined> = ref();
    const parent = ref(false);
    const householdID = ref();
    const houseName = ref('');
    const houseInfo = ref();
    const userEmail = ref(data.value?.user?.email)

    const formFeedback: Ref<String> = ref('');

    const createH = ref(false);

    const submitForm = async () => {
        formFeedback.value = '';

        // Check if input is correct
        if(!name.value.trim() || !lName.value.trim() || !year.value || !month.value || !day.value){
            console.log(name.value.trim() , lName.value.trim() , year.value, month.value , day.value)
            formFeedback.value = 'Personal Information Incomplete';
            return;
        }

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

        //final form validation
        if(userEmail == undefined) {
            formFeedback.value =  `The user's email is invalid.`;
            return
        }
        const currentYear = new Date().getFullYear();
        if (year.value < 1900 || year.value > currentYear) {
            formFeedback.value =  `Year must be between 1900 and ${currentYear}.`;
            return
        }
        if (month.value < 1 || month.value > 12) {
            formFeedback.value = "Month must be between 01 and 12.";
            return
        }

        function isLeapYear(y : number) {
            return y % 400 === 0 || (y % 100 !== 0 && y % 4 === 0);
        }

        const monthLengths = [31, isLeapYear(year.value) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (day.value < 1 || day.value > monthLengths[month.value - 1]) {
            formFeedback.value = `Day must be between 01 and ${monthLengths[month.value - 1]} for the given month.`;
            return;
        }
        
        const validUserToCreate : User = {
            uID: null,
            fName: name.value,
            lName: lName.value,
            dob: new Date(`${year.value}-${month.value}-${day.value}`),
            pointsEarned: 0,
            googleAuth: userEmail.value!,
            PorCFlag: parent.value ? 1 : 0,
            hID: householdID.value
        }
        
        console.log(validUserToCreate)
    // @ts-ignore
        validUserToCreate.uID = await createUser(validUserToCreate).then(res => res.data).insertId;
        console.log(validUserToCreate);
        loggedInUser.value = validUserToCreate
        formFeedback.value = 'Form Complete';
        // Then redirect to dashboard
        // <NuxtLink to="/about">About</NuxtLink>
        navigateTo('/dashboard')
    }

    function updateStyle(b: boolean){
        if(b!=parent.value){
            parent.value = b;
            if(b){//was changed to parent
                document.getElementById('parentButton')?.classList.add('bg-blue-500');
                document.getElementById('parentButton')?.classList.remove('bg-blue-100');
                document.getElementById('childButton')?.classList.add('bg-blue-100');
                document.getElementById('childButton')?.classList.remove('bg-blue-500');
            }
            else{//was changed to child
                createH.value = false;
                document.getElementById('parentButton')?.classList.add('bg-blue-100');
                document.getElementById('parentButton')?.classList.remove('bg-blue-500');
                document.getElementById('childButton')?.classList.add('bg-blue-500');
                document.getElementById('childButton')?.classList.remove('bg-blue-100');
            }
        }
    }

  definePageMeta({
    layout: false,
    // Input some kind of redirect for users who are already registered in the database. (to dashboard)
})
</script>

<template>
    <div class="bg-gradient-to-b from-bone-200 to-white w-screen h-screen overflow-auto justify-center flex">
        <!-- What we need: first name, last name, Parent vs. Child status, Household (creation available only for parent users)-->
        <div class="shadow-md bg-blue-400 text-black rounded-xl p-5 my-auto w-3/5 mx-auto overflow-auto h-fit content-center">
            <h1 class="font-museoModerno text-4xl my-10 text-center">Register User</h1>
            <!-- Let's start with name -->
            <form class="text-sm sm:text-base justify-center text-center">
                <div class="flex flex-col mb-4 w-50 mx-auto text-center">
                    <p class="font-museoModerno mb-2 mt-4">First name: </p>
                    <input v-model="name" placeholder="First name" class="bg-blue-100 rounded-md px-2"/>
                    <p class="font-museoModerno mb-2 mt-4">Last name: </p>
                    <input v-model="lName" placeholder="Last name" class="bg-blue-100 rounded-md px-2"/>
                    <div class = "flex flex-row mt-4 mb-2 mx-auto">
                        <p class="font-museoModerno mr-1">Birthday  </p>
                    </div>
                    <div class="flex flex-row mx-auto">
                        <input v-model="year" placeholder="YYYY" class="bg-blue-100 w-20 rounded-md px-2"/>
                        <input v-model="month" placeholder="MM" class="bg-blue-100 w-12 rounded-md mx-2 px-2"/>
                        <input v-model="day" placeholder="DD" class="bg-blue-100 w-12 rounded-md px-2"/>
                    </div>
                    
                </div>
                <div class="flex flex-col justify-center items-center my-10">
                    <p class="font-museoModerno">User Type : <span v-if="parent"> Parent</span><span v-if="!parent"> Child</span></p>
                    <div class="w-1000 flex flex-row mt-2">
                        <button type="button" class="mr-6 rounded-md bg-blue-100 transition-all duration-100 hover:bg-blue-500 text-black px-6 py-2" 
                        @click="updateStyle(true)" id="parentButton"> 
                            Parent
                        </button>
                        <button type="button" class="rounded-md bg-blue-500 transition-all duration-100 hover:bg-blue-500 text-black px-6 py-2"
                        @click="updateStyle(false)" id="childButton"> 
                            Child
                        </button>
                    </div>
                </div>

                <div v-if="!createH" class="w-1000 flex flex-col my-5">
                    <p class="font-museoModerno mb-2 mt-4">Household ID:</p>
                    <input v-model="householdID" placeholder="House ID" class="bg-blue-100 rounded-md text-center w-50 mx-auto mb-2" />
                    <p v-if="!houseInfo"> Please select a valid Household ID to join</p>
                
                    <div v-if="parent" class="flex justify-center items-center">
                        <button type="button" class="rounded-md bg-blue-100 transition-all duration-100 hover:bg-blue-500 text-black px-6 py-2 mt-4"
                        @click="createH=true">
                            Create New Household
                        </button>
                    </div>
                </div>
                <div v-if="createH" class="w-1000 flex flex-col">
                    <p class="font-museoModerno mb-2 mt-4">Enter Household name:</p>
                    <input v-model="houseName" placeholder="Household name" class="bg-blue-100 rounded-md px-2" />
                
                    <div class="flex justify-center items-center">
                        <button type="button" class="rounded-md bg-blue-100 transition-all duration-100 hover:bg-blue-500 text-black px-6 py-2 mt-4"
                        @click="createH=false">
                            Cancel
                        </button>
                    </div>
                </div>
                <div class="flex flex-col w-1000 justify-center items-center mx-auto">
                    <v-btn type="submit" class="rounded-md w-1/3 bg-blue-100  hover:bg-blue-500 text-black mx-auto my-10" 
                    @click.prevent="submitForm">
                        Submit
                    </v-btn> 
                    <p class="text-sm text-red">{{ formFeedback }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

