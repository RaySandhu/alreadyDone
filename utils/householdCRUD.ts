export async function createHousehold() {
    const res = await $fetch('/api/household/create', {
      method: 'post',
      body: {}
    })
    console.log(res)
  }

export const getSpecificHH = async (id : number) => {
    const response = await $fetch(`/api/household/${id}`);
    // @ts-ignore
    if (response.data.length === 0) {
        console.log('This household does not exist in our records.')
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