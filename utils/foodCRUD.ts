export async function createFood(foodInfo: Food) {

    const res = await $fetch('/api/food/create', {
      method: 'post',
      body: {
        'Food-ID' : null,           // need to run a check to see if food already exists?
        'Name' : foodInfo['Name'],
        'Point value' : foodInfo["Point value"],
        'Quantity' : foodInfo.Quantity,
        'H-ID' : foodInfo["H-ID"],
      }
    })
    console.log(res)
}

export async function updateFood(foodInfo:Food) {
  const res = await $fetch(`/api/food/query?fID=0&hID=0`, {
    method: 'post',
    body: {
        ... foodInfo
    }
  })
  console.log(res)
}

export const getAllFoodInHousehold = async (hID : number) => {
  const response = await $fetch(`/api/food/query?fID=0&hID=${hID}`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('No food exists in our records.')
  } else console.log('Retrieved data: ',response)
  return response
}

export const getFoodByID = async (fID : number) => {
  const response = await $fetch(`/api/food/query?fID=${fID}&hID=0`, {
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('No such food exists in our records.')
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

  export async function stockFood (foodInfo: Food, quantity: number) {
    const stockedFood : Food = {
      ...foodInfo,
      'Quantity' : foodInfo.Quantity + quantity
    }
    updateFood(stockedFood);
  }