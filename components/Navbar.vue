<script setup lang="ts">
    const { data } = useAuth();

    await fetchLoggedInUser(data.value?.user?.email!);
    if(loggedInUser.value == -1) {
        navigateTo('/register')
    }
    await refreshData(data.value?.user?.email!)

    const firstUser = loggedInUser.value[0];
    const HName = currentHouse.value.data[0].Name;
    const numRewards = obtainedRewardData.value.length || 0;

</script>

<template>
    <div class="fixed flex flex-shrink-0 h-16 w-screen max-w-full z-10 bg-gradient-to-b from-white to-orange-50 shadow-md border-b-2 border-red-200">
        <div class="flex h-16 items-center mr-1">
            <!-- Logo and Name (not in mobile view) + Menu Hamburger for the main side bar (mobile view)-->
            <nuxt-icon name="AlreadyDoneLogo" class="text-5xl text-amour-300 mx-3" />
            <h1 class="hidden md:block font-museoModerno text-amour-200 mr-20">
                Already Done
            </h1>
        </div>
        <div class="flex justify-center align-center">
            <!-- User points, Number of rewards redeemed, User name, Household name-->
            <div class="flex align-center justify-center mx-5">
                <nuxt-icon name="Points" class="text-2xl md:text-3xl text-gold-400 mt-1 mr-1" />
                <h1 class="text-gold-400"> {{ firstUser['Points earned'] }} </h1>
            </div>
            <div class="flex justify-center align-center mx-5">
                <nuxt-icon name="Trophy" class="text-2xl md:text-2xl text-gold-400 mt-1 mr-1" />
                <h1 class="text-gold-400"> {{ numRewards }} </h1>
            </div>
            
        </div>
        <div class="hidden md:block ml-auto mr-5">
            <div class="flex flex-row justify-center align-center h-16">
                <h1 class="text-amour-300 mx-5"> {{ firstUser['Fname'] }} {{ firstUser['Lname'] }} </h1>
                <a href="/household">
                    <v-btn color="red"> {{ HName }} </v-btn>
                </a>
            </div>
        </div>
    </div>

</template>