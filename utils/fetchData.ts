export const householdData = ref();
export const currentHouse = ref();
export const userData = ref();
export const foodData = ref();
export const rewardsData = ref();
export const trashData = ref();
export const consumedFoodData = ref();
export const obtainedRewardData = ref();
export const loggedInUser= ref()

// These fetch functions will require the users ID as parameters

export const fetchHouseholdData = async () => {
    const response = await $fetch('/api/household/0');
    householdData.value = response
};
export const fetchCurrentHouse = async (hID : number) => {
    const response = await getSpecificHousehold(hID);
    currentHouse.value = response;
}

export const fetchUserData = async (hID : number) => {
    const response = await getAllUsersInHousehold(hID); // change this to currently logged in hID using user info on log in
    userData.value = response
};
export const fetchFoodData = async (hID : number) => {
    const response = await getAllFoodInHousehold(hID); // change this to currently logged in hID using user info on log in
    foodData.value = response
};
export const fetchRewardsData = async (hID : number) => {
    const response = await getAllRewardsInHousehold(hID)
    rewardsData.value = response
};
export const fetchConsumedFoodData = async (uID : number) => {
    const response = await getConsumedFoodForUser(uID)
    consumedFoodData.value = response
};
export const fetchObtainedRewardsData = async (uID : number) => {
    const response = await getObtainedRewardForUser(uID)
    obtainedRewardData.value = response
};
export const fetchTrashData = async () => {
    const response = await $fetch('/api/trashBin', {method : 'get'});
    trashData.value = response
};

export const fetchLoggedInUser = async (email : String) => {
    const response = getUserByEmail(email)
    // @ts-ignore
    loggedInUser.value = await response.then(res => res.data)
    if (loggedInUser.value.length == 0) {
        loggedInUser.value = -1
    }
}

// Always need to follow this call with a check for logged in user to route to /login if user not valid
export const refreshData = async (gmail: String) => {
    console.log('Refreshing Data...')
    await fetchLoggedInUser(gmail)
    const firstUser = loggedInUser.value[0]; 
    await fetchHouseholdData()
    await fetchCurrentHouse(firstUser['H-ID'])
    await fetchUserData(firstUser['H-ID'])
    await fetchFoodData(firstUser['H-ID'])
    await fetchRewardsData(firstUser['H-ID'])
    await fetchTrashData()
    await fetchConsumedFoodData(firstUser['User-ID'])
    await fetchObtainedRewardsData(firstUser['User-ID'])
    console.log('Refresh complete!')
}