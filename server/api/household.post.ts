async function createHousehold() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.execute('INSERT INTO Household VALUES (NULL)'); // test : success!
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  export default defineEventHandler(async (event) => {
    const body = await readBody(event)  // test : success!
    try {
      const res = await createHousehold();
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a houshold', details: error.message };
    }
  });
  