async function createHousehold(houseName: String) {
    const connection = await dbConnect();
    try {
      const [results] = await connection.execute('INSERT INTO Household VALUES (NULL, ?)', [houseName]); // test : success!
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  export default defineEventHandler(async (event) => {
    const householdInfo = await readBody(event)
    try {
      const res = await createHousehold(householdInfo.Name);
      console.log('Body contents are : ', householdInfo)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a houshold', details: error.message };
    }
  });
  