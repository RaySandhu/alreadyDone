export async function createReward(rewardInfo: Reward) {

    const res = await $fetch('/api/reward/create', {
      method: 'post',
      body: {
        'rID' : null,           // need to run a check to see if reward already exists
        'name' : rewardInfo.name,
        'pointsNeeded' : rewardInfo.pointsNeeded,
        'description' : rewardInfo.description,
        'status' : rewardInfo.status,
        'hID' : rewardInfo.hID,
      }
    })
    console.log(res)
}

export async function updateReward(rewardInfo:Reward) {
  const res = await $fetch(`/api/reward/query?rID=0&hID=0`, {
    method: 'post',
    body: {
        'R-ID' : rewardInfo.rID,
        'Name' : rewardInfo.name,
        'Points needed' : rewardInfo.pointsNeeded,
        'Description' : rewardInfo.description,
        'Status' : rewardInfo.status,
        'H-ID' : rewardInfo.hID,
    }
  })
  console.log(res)
}

export const getRewardByID = async (rID : number) => {
  const response = await $fetch(`/api/reward/query?rID=${rID}&hID=0`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This reward does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export const getAllRewardsInHousehold = async (hID : number) => {
  const response = await $fetch(`/api/reward/query?rID=0&hID=${hID}`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This reward does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export async function deleteReward(rID : number) {
    const res = await $fetch(`/api/reward/query?rID=${rID}&hID=0`, {
      method: 'delete',
    })
    console.log(res)
   return res;
  }