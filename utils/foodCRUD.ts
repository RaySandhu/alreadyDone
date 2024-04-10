export async function createFood(foodInfo: Food) {

    const res = await $fetch('/api/food/create', {
      
      method: 'post',
      body: {
        'fID' : null,           // need to run a check to see if food already exists?
        'name' : foodInfo.name,
        'pointValue' : foodInfo.pointValue,
        'quantity' : foodInfo.quantity,
        'hID' : foodInfo.hID,
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
  // @ts-ignore
  if (response.data.length === 0) {
      console.log('No such food exists in our records.')
  }
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
      'quantity' : foodInfo.quantity + quantity
    }
    updateFood(stockedFood);
  }