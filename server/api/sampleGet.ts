async function getPosts() {
  const connection = await dbConnect();
  try {
    const [results] = await connection.query('SELECT * FROM posts');
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
    const posts = await getPosts();
    return { data: posts };
  } catch (error:any) {
    console.error(error); 
    return { error: 'Failed to fetch posts', details: error.message };
  }
});
