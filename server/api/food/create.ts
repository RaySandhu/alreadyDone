async function createFood(food: Food) {
    const connection = await dbConnect();
    try {
        
        const [results] = await connection.execute(
            'INSERT INTO Food VALUES (NULL,?,?,?,?)',
            [
              food["Point value"], 
              food.Quantity, 
              food["Expiry date"],
              food["H-ID"]
            ] // add name when available
        ); 
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  export default defineEventHandler(async (event) => {
    const body = await readBody(event)  
    try {
      const res = await createFood(body);
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a food item', details: error.message };
    }
  });
  