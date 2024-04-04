export const householdData = ref();
export const userData = ref();
export const foodData = ref();
export const rewardsData = ref();
export const trashData = ref();
export const consumedFoodData = ref();
export const obtainedRewardData = ref();

// These fetch functions will require the users ID as parameters

export const fetchHouseholdData = async () => {
    const response = await $fetch('/api/household/0');
    householdData.value = response
};
export const fetchUserData = async () => {
    const response = await getAllUsersInHousehold(5); // change this to currently logged in hID using user info on log in
    userData.value = response
};
export const fetchFoodData = async () => {
    const response = await getAllFoodInHousehold(5); // change this to currently logged in hID using user info on log in
    foodData.value = response
};
export const fetchRewardsData = async () => {
    const response = await getAllRewardsInHousehold(5)
    rewardsData.value = response
};
export const fetchConsumedFoodData = async () => {
    const response = await getConsumedFoodForUser(5)
    consumedFoodData.value = response
};
export const fetchObtainedRewardsData = async () => {
    const response = await getObtainedRewardForUser(5)
    obtainedRewardData.value = response
};
export const fetchTrashData = async () => {
    const response = await $fetch('/api/trashBin', {method : 'get'});
    trashData.value = response
};

export const refreshData = async () => {
    console.log('Refreshing Data...')
    await fetchHouseholdData()
    await fetchUserData()
    await fetchFoodData()
    await fetchRewardsData()
    await fetchTrashData()
    await fetchConsumedFoodData()
    await fetchObtainedRewardsData()
    console.log('Refresh complete!')
}