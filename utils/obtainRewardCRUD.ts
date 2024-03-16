/**
 * Easy access function to log a reward item as obtained and update user points accordingly
 * Must call once per single reward item obtained
 * @param rewardInfo The reward item that was obtained
 * @param userID the user object for user consuming the reward
 */
export async function obtainReward(rewardInfo: Reward, userInfo: User) {

    const res = await $fetch('/api/obtainReward/create', {
      method: 'post',
      body: {
        'redeemID' : rewardInfo.rID,
        'date' : new Date(),
        'uID' : userInfo.uID,
      }
    })
    updateUserPoints(userInfo, -1 * rewardInfo.pointsNeeded) 
  
    console.log(res)
}

/**
 * Return obtained reward info for a user, reward type specific if specified.
 * If obtained reward info is desired for all users in a household, request iteratively for each user
 * @param uID 
 * @param orID 
 * @returns 
 */
export const getObtainedRewardForUser = async (uID : number,orID : number = 0) => {
  const response = await $fetch(`/api/obtainReward/query?orID=${orID}&uID=${uID}&date=`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This reward does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

/**
 * This will restore stock to the reward item and 
 * the decision to trash the added items will be up to the frontend verification
 * @param orID reward type to be deleted
 * @param uID user for which obtained rewards are being deleted
 * @param doc date of consumption for enriched verification of rows to be deleted
 * @returns 
 */
export async function deleteObtainedReward(orID : number, uID: number, doe: Date) {
    const res = await $fetch(`/api/obtainReward/query?orID=${orID}&uID=${uID}&doe=${doe.toISOString()}`, {
      method: 'delete',
    })
    console.log(res)
   return res;
}