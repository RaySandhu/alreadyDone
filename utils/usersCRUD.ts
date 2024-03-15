export async function createUser(userInfo: User) {
    // !!! Can make a duplicate prevention against the AUTH field when we set that up
    const res = await $fetch('/api/users/create', {
      method: 'post',
      body: {
        'uID'           : null,
        'fName'         : userInfo.fName,
        'lName'         : userInfo.lName,
        'dob'           : userInfo.dob,
        'pointsEarned'  : 0,
        'googleAuth'    : userInfo.googleAuth,
        'PorCFlag'      : userInfo.PorCFlag,
        'hID'           : userInfo.hID,
      }
    })
    console.log(res)
}

export async function updateUser(userInfo:User) {
  const res = await $fetch(`/api/users/query?uID=0&hID=0`, {
    method: 'post',
    body: {
      'uID'           : userInfo.uID,
      'fName'         : userInfo.fName,
      'lName'         : userInfo.lName,
      'dob'           : userInfo.dob,
      'pointsEarned'  : userInfo.PorCFlag,
      'googleAuth'    : userInfo.googleAuth,
      'PorCFlag'      : userInfo.PorCFlag,
      'hID'           : userInfo.hID,
    }
  })
  console.log(res, userInfo.uID)
}

export const getAllUsersInHousehold = async (hID : number) => {
  const response = await $fetch(`/api/users/query?uID=0&hID=${hID}`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This user does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export const getUserByID = async (uID : number) => {
  const response = await $fetch(`/api/users/query?uID=${uID}&hID=0`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This user does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export async function updateUserPoints(userInfo:User, pointValue: number) {
  const res = await $fetch(`/api/users/query?uID=0&hID=0`, {
    method: 'post',
    body: {
      ...userInfo,
      'Points earned' : userInfo.pointsEarned + pointValue,
    }
  })
  console.log(res)
}

export async function deleteUser(uID : number) {
    const res = await $fetch(`/api/users/query?uID=${uID}&hID=0`, {
      method: 'delete',
    })
    console.log(res)
   return res;
  }