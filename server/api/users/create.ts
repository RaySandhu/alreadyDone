interface User {
    'User-ID' : number,
    'FName': String,
    'LName': String,
    'DOB': Date,
    'Points earned': number,
    'Google Auth': String,
    'PorC-Flag': String,
    'H-ID': number
}

async function createUser(user: User) {
    const connection = await dbConnect();
    try {
        
        const [results] = await connection.execute(
            'INSERT INTO Users VALUES (NULL,?,?,?,0,?,?,?)',
            [user.FName, user.LName, user.DOB, user["Google Auth"], user["PorC-Flag"], user["H-ID"]]
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
  