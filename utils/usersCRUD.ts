export async function createUser(userInfo: User) {
    // !!! Can make a duplicate prevention against the AUTH field when we set that up
    const res = await $fetch('/api/users/create', {
      method: 'post',
      body: {
        'User-ID'       : null,
        'FName'         : userInfo.FName,
        'LName'         : userInfo.LName,
        'DOB'           : userInfo.DOB,
        'Points earned' : 0,
        'Google Auth'   : userInfo["Google Auth"], // FK from Auth
        'PorC-Flag'     : userInfo["PorC-Flag"],
        'H-ID'          : userInfo["H-ID"],
      }
    })
    console.log(res)
}

export async function updateUser(userInfo:User) {
  const res = await $fetch(`/api/users/query?uID=0&hID=0`, {
    method: 'post',
    body: {
      'User-ID'       : userInfo["User-ID"],
      'FName'         : userInfo.FName,
      'LName'         : userInfo.LName,
      'DOB'           : userInfo.DOB,
      'Points earned' : userInfo["Points earned"],
      'Google Auth'   : userInfo["Google Auth"], // FK from Auth
      'PorC-Flag'     : userInfo["PorC-Flag"],
      'H-ID'          : userInfo["H-ID"],
    }
  })
  console.log(res)
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
      'Points earned' : userInfo["Points earned"] + pointValue,
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