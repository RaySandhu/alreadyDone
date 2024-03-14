async function createUser(user: User) {
    const connection = await dbConnect();
    try {
        
        const [results] = await connection.execute(
            'INSERT INTO Users VALUES (NULL,?,?,?,0,?,?,?)',
            [user.fName, user.lName, user.dob, user.googleAuth, user.PorCFlag, user.hID]
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
      const res = await createUser(body);
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a user', details: error.message };
    }
  });
  