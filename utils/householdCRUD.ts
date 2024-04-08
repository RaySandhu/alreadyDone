export async function createHousehold(houseName : String) {
    const res = await $fetch('/api/household/create', {
      method: 'post',
      body: {
        'Name' : houseName
      }
    })
    console.log(res)
    return res
  }

export const getSpecificHousehold = async (id : number) => {
    const response = await $fetch(`/api/household/${id}`, {
      method: 'get'
    });
    // @ts-ignore
    if (response.data.length === 0) {
        console.log('This household does not exist in our records.')
        return -1
    } else console.log('Retrieved data: ',response)
    return response
}

export async function deleteHousehold(id : number) {
    const res = await $fetch(`/api/household/${id}`, {
      method: 'delete',
    })
    console.log(res)
   return res;
  }