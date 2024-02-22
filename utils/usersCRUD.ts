export async function createUser(fname:String, lname:String, DOB:Date, auth:String, admin:String, houseID:Number) {
    // !!! Can make a duplicate prevention against the AUTH field when we set that up
    const res = await $fetch('/api/users/create', {
      method: 'post',
      body: {
        'User-ID'       : null,
        'FName'         : fname,
        'LName'         : lname,
        'DOB'           : DOB,
        'Points earned' : 0,
        'Google Auth'   : auth,
        'PorC-Flag'     : admin,
        'H-ID'          : houseID,
      }
    })
    console.log(res)
}

export const getSpecificUser = async (uID : number, hID : number) => {
    const response = await $fetch(`/api/users/query?uID=${uID}&hID=${hID}`, {
      method: 'get'
    });
    console.log(response)
    // @ts-ignore
    if (response.data.length === 0) {
        console.log('This user does not exist in our records.')
    } else console.log('Retrieved data: ',response)
    return response
}

export async function deleteUser(uID : number) {
    const res = await $fetch(`/api/users/query?uID=${uID}`, {
      method: 'delete',
    })
    console.log(res)
   return res;
  }