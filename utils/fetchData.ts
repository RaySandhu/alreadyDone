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
    const response = await $fetch('/api/users/query?uID=0&hID=5', {method : 'get'}); // change this to hID accepting the logged in h-ID
    userData.value = response
};
export const fetchFoodData = async () => {
    const response = await $fetch('/api/food', {method : 'get'});
    foodData.value = response
};
export const fetchRewardsData = async () => {
    const response = await $fetch('/api/rewards', {method : 'get'});
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