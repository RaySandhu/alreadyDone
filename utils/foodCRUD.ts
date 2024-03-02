export async function createFood(foodInfo: Food) {

    const res = await $fetch('/api/food/create', {
      method: 'post',
      body: {
        'Food-ID' : null,           // need to run a check to see if food already exists
        'Point value' : foodInfo["Point value"],
        'Quantity' : foodInfo.Quantity,
        'Expiry date' : foodInfo["Expiry date"],
        'H-ID' : foodInfo["H-ID"],
      }
    })
    console.log(res)
}

export async function updateFood(foodInfo:Food) {
  const res = await $fetch(`/api/food/query?fID=0&hID=0`, {
    method: 'post',
    body: {
        'Food-ID' : foodInfo["Food-ID"],
        'Point value' : foodInfo["Point value"],
        'Quantity' : foodInfo.Quantity,
        'Expiry date' : foodInfo["Expiry date"],
        'H-ID' : foodInfo["H-ID"],
    }
  })
  console.log(res)
}

export const getFood = async (hID : number,fID : number = 0) => {
  const response = await $fetch(`/api/food/query?fID=${fID}&hID=${hID}`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('This food does not exist in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export async function deleteFood(fID : number) {
    const res = await $fetch(`/api/food/query?fID=${fID}&hID=0`, {
      method: 'delete',
    })
    console.log(res)
   return res;
  }