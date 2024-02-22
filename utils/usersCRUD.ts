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