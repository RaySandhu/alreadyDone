export async function throwTrash(hID: number, trashedFood: Food, user: User, quantity: number = 1) {

    // could look into just adding quantity fields in consumed food and trash
    for(var i = 0; i < quantity; i++) {
        const res = await $fetch('/api/trashBin', {
            method: 'post',
            body: {
              'binID' : 0,  // will get auto incremented in DB
              'hID' : hID,
              'fID' : trashedFood.fID,
              'uID' : user.uID,
              'dateDiscarded' : new Date(),
            }
          })
    }

    trashedFood.quantity -= quantity
      
    updateFood(trashedFood)
}