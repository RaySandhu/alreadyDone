async function getTrash() {
    const connection = await dbConnect();
    try {
      const [results] = await connection.query('SELECT * FROM `Trash Bin`');
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
      const posts = await getTrash();
      return { data: posts };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to fetch trash data', details: error.message };
    }
  });
  