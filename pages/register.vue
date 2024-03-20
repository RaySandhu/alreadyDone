<script setup lang="ts">
    import { ref } from 'vue';

    const { data } = useAuth();

    type FormFeedbackType = 'incomplete' | 'invalid household ID' | 'invalid DOB' | 'success' | null;

    const name = ref('');
    const lName = ref('');
    const year = ref('');
    const month = ref('');
    const day = ref('');
    const parent = ref(false);
    const houseHold = ref('');
    const houseName = ref('');
    const formFeedback: Ref<FormFeedbackType> = ref(null);

    const createH = ref(false);

    const submitForm = async () => {
        formFeedback.value = null;

        // Check if input is correct
        if(!name.value.trim() || !lName.value.trim() || !year.value.trim() || !month.value.trim() || !day.value.trim()){
            formFeedback.value = 'incomplete';
            return;
        }
        // Check if year/month/day are valid inputs

        if(createH){ //Household being created
            if(!houseName.value.trim()){
                formFeedback.value = 'incomplete';
                return;
            }
            // create random ID
            // Put new household into database
            // houseHold.value = the new random ID I just made.
        }
        else{
            if(!houseHold.value.trim()){
                formFeedback.value = 'incomplete';
            }
            //if (household id not in database) {
            // formFeedback.value = 'invalid household ID';
            //}
        }

        // Put into database:
        // UserID: Random number
        // Firstname: name.value
        // Lastname: lName.value
        // DOB: year.value/month.value/day.value ----> May make a composite value
        // Points earned = 0 -----> Do we want to give any points for joining?
        // Google auth: email?
        // PorC flag (true if parent): parent.value
        // H-ID: houseHold.value

        formFeedback.value = 'success';
        // Then redirect to dashboard
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
        <div class="shadow-md bg-blue-400 text-black rounded-xl p-5 my-16 w-4/5 overflow-auto">
            <h1 class="font-museoModerno text-lg font-bold">Register</h1>
            <!-- Let's start with name -->
            <form class="text-sm sm:text-base">
                <div class="flex flex-col mb-4 w-1000 justify-center">
                    <p class="font-museoModerno mb-2 mt-4">First name: </p>
                    <input v-model="name" placeholder="First name" class="bg-blue-100 rounded-md px-2"/>
                    <p class="font-museoModerno mb-2 mt-4">Last name: </p>
                    <input v-model="lName" placeholder="Last name" class="bg-blue-100 rounded-md px-2"/>
                    <div class = "flex flex-row mt-4 mb-2">
                        <p class="font-museoModerno mr-1">Birthday  </p>
                        <p class="font-sans">(YYYY/MM/DD): </p>
                    </div>
                    <div class="flex flex-row">
                        <input v-model="year" placeholder="1999" class="bg-blue-100 w-20 rounded-md px-2"/>
                        <input v-model="month" placeholder="10" class="bg-blue-100 w-10 rounded-md mx-2 px-2"/>
                        <input v-model="day" placeholder="29" class="bg-blue-100 w-10 rounded-md px-2"/>
                    </div>
                    
                </div>
                <p class="font-museoModerno flex">User selected- <p v-if="parent"> Parent</p><p v-if="!parent"> Child</p></p>
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
                <div v-if="!createH" class="w-1000 flex flex-col">
                    <p class="font-museoModerno mb-2 mt-4">Household ID:</p>
                    <input v-model="houseHold" placeholder="House ID" class="bg-blue-100 rounded-md px-2" />
                
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
                <div class="flex flex-col w-1000 justify-center items-center">
                    <v-btn type="submit" class="rounded-md w-1/3 bg-blue-100 transition-all duration-100 hover:bg-blue-500 text-black px-6 py-2 mt-4" 
                    @click.prevent="submitForm"> 
                        Submit 
                    </v-btn> 
                    <p class="text-sm text-bone-100">{{ formFeedback }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

