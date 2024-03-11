async function createConsumedFood(cfood: ConsumedFood) {
    const connection = await dbConnect();
    try {
        const [results] = await connection.execute(
            'INSERT INTO Consumed_Food VALUES (NULL,?,?,?)',
            [
              cfood["CFood-ID"],
              cfood["Date of Consumption"], 
              cfood["U-ID"],
            ]
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
      const res = await createConsumedFood(body);
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a consumed food item', details: error.message };
    }
  });
  