import type { Reward } from "~/server/utils/entityTypes"

export async function createReward(rewardInfo: Reward) {

    const res = await $fetch('/api/reward/create', {
      method: 'post',
      body: {
        'R-ID' : null,           // need to run a check to see if reward already exists
        'Name' : rewardInfo.Name,
        'Points needed' : rewardInfo["Points needed"],
        'Description' : rewardInfo.Description,
        'Status' : rewardInfo.Status,
        'H-ID' : rewardInfo["H-ID"],
      }
    })
    console.log(res)
}

export async function updateReward(rewardInfo:Reward) {
  const res = await $fetch(`/api/reward/query?rID=0&hID=0`, {
    method: 'post',
    body: {
        'Reward-ID' : rewardInfo["R-ID"],
        'Name' : rewardInfo.Name,
        'Points needed' : rewardInfo["Points needed"],
        'Description' : rewardInfo.Description,
        'Status' : rewardInfo.Status,
        'H-ID' : rewardInfo["H-ID"],
    }
  })
  console.log(res)
}

export const getReward = async (hID : number,rID : number = 0) => {
  const response = await $fetch(`/api/reward/query?rID=${rID}&hID=${hID}`, {
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