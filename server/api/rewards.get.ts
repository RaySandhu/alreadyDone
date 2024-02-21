async function getRewards() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.query('SELECT * FROM Reward');
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
      const posts = await getRewards();
      return { data: posts };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to fetch Rewards data', details: error.message };
    }
  });
  