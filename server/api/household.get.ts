async function getHouseholds() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.query('SELECT * FROM Household');
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  export default defineEventHandler(async (event) => {
    try {
      const households = await getHouseholds();
      return { data: households };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to fetch household data', details: error.message };
    }
  });
  