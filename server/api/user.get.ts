async function getAllUsers() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.query('SELECT * FROM Users');
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
      const posts = await getAllUsers();
      return { data: posts };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to fetch User data', details: error.message };
    }
  });
  