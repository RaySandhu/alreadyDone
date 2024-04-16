/**
 * Easy access function to log a food item as consumed and decrease its available quantity
 * Must call once per single food item consumed
 * @param foodInfo The food item that was consumed
 * @param userID the user object for user consuming the food
 * @param quantity number of the food items were consumed
 */
export async function consumeFood(foodInfo: Food, userInfo: User) {

  const res = await $fetch('/api/consumeFood/create', {
    method: 'post',
    body: {
      'cFoodID': foodInfo.fID,
      'dateOfConsumption': new Date(),
      'uID': userInfo['User-ID'],
    }
  })
  // rewrite food item with one less available quantity. 
  const updatedFoodInfo: Food = {
    ...foodInfo,
    'quantity': foodInfo.quantity - 1,
  }
  //!! need to protect this following call in success response conditional
  updateFood(updatedFoodInfo)
  updateUserPoints(userInfo, foodInfo.pointValue)

  console.log(res)
}

/**
 * Return consumed food info for a user, food type specific if specified.
 * If consumed food info is desired for all users in a household, request iteratively for each user
 * @param uID 
 * @param fID 
 * @returns 
 */
export const getConsumedFoodForUser = async (uID: number, fID: number = 0) => {
  const response = await $fetch(`/api/consumeFood/query?fID=${fID}&uID=${uID}&doe=''`, { // !!! need to add search by date
    method: 'get'
  });
  console.log(response)
  // @ts-ignore
  if (response.data.length === 0) {
    console.log('This food does not exist in our records.')
  } else console.log('Consumed food data: ', response)
  console.log(fID)
  return response
}

/**
 * This will restore stock to the food item and 
 * the decision to trash the added items will be up to the frontend verification
 * @param cfID food type to be deleted
 * @param uID user for which consumed foods are being deleted
 * @param doc date of consumption for enriched verification of rows to be deleted
 * @returns 
 */
export async function deleteConsumedFood(cfID: number, uID: number, doe: Date) {
  const res = await $fetch(`/api/consumeFood/query?cfID=${cfID}&uID=${uID}&doe=${doe.toISOString()}`, {
    method: 'delete',
  })
  console.log(res)
  return res;
}