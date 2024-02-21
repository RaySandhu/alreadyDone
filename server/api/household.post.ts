async function getHouseholds() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.query('INSERT INTO FROM Household');
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
      const posts = await getHouseholds();
      return { data: posts };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to fetch household data', details: error.message };
    }
  });
  