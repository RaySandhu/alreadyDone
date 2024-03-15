export const householdData = ref();
export const userData = ref();
export const foodData = ref();
export const rewardsData = ref();
export const trashData = ref();

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
    console.log('Refresh complete!')
}