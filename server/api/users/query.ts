/*
    uID = 0 will return all users in Household
    set hID = 0 as convention if querying all users
*/
async function getUser(uID : number, hID : number) {
    const connection = await dbConnect();

    if (uID == 0) {
      try {
        let sql = `SELECT * FROM Users WHERE \`H-ID\` = ${hID}`;
        const params: number[] = [];
  
        const [results] = await connection.query(sql, params);
        console.log(sql, params)
        return results;
      } catch (err) {
        console.error('Error:', err);
        throw err;
      } finally {
        await connection.end();
      }
    } else {
      try {
        let sql = `SELECT * FROM Users WHERE \`User-ID\` = ${uID}`;
        const params: number[] = [];
  
        const [results] = await connection.query(sql, params);
        console.log(sql, params)
        return results;
      } catch (err) {
        console.error('Error:', err);
        throw err;
      } finally {
        await connection.end();
      }
    }
  }

  async function getUserByAuth(email : String, hID : number) {
    const connection = await dbConnect();

    try {
        let sql = `SELECT * FROM Users WHERE \`Google Auth\` = ?`;
        const params: String[] = [email];
        const [results] = await connection.query(sql, params);
        console.log(sql)
        return results;

    } catch (err) {
        console.error('Error:', err);
        throw err;

    } finally {
      await connection.end();
    }
  }
  
  async function updateUser(updatedInfo:User) {
    const connection = await dbConnect();
    console.log(updatedInfo);
    try {
      let sql = `UPDATE Users
                 SET 
                   Fname = ?,
                   Lname = ?, 
                   DOB = ?,
                   \`Points Earned\` = ?,
                   \`PorC-Flag\` = ?
                 WHERE \`User-ID\` = ?;`;
      const params = [
        updatedInfo.fName,
        updatedInfo.lName,
        updatedInfo.dob,
        updatedInfo.pointsEarned,
        updatedInfo.PorCFlag,
        updatedInfo.uID
      ];
  
      const [results] = await connection.query(sql, params);
      console.log(sql, params);
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  async function deleteUser (uID: number) {
    const connection = await dbConnect()
    try {
      let sql = 'DELETE FROM Users WHERE `User-ID` = ?'
      const params: number[] = [uID];
  
      const [results] = await connection.query(sql,params)
      // @ts-ignore
      if (results.affectedRows === 0) {
        throw createError({ statusCode: 404, message: 'User not found' });
      }
      return results
    } catch (err) {
      console.error ('Error : ', err)
      throw err
    } finally {
      await connection.end()
    }
  }
  
    
    export default defineEventHandler(async (event) => {
      const method = event.method
      const query = getQuery(event)
      const uID = query.uID ? parseInt(query.uID!.toString()) as number : -1
      const hID = parseInt(query.hID!.toString()) as number
      const email = query.email as String

      console.log(uID, hID, email)
      
      switch (method) {
        case 'GET':
          if (uID != -1) {
            try {
              const users = await getUser(uID, hID);
              return { data: users };
            } catch (error:any) {
              console.error(error); 
              return { error: 'Failed to fetch user data', details: error.message };
            }
          } else {
            try {
              const users = await getUserByAuth(email, hID);
              return { data: users };
            } catch (error:any) {
              console.error(error);
              return { error: 'Failed to fetch user data', details: error.message };
            }
          }
        case 'POST':
          const body = await readBody(event)
          try {
            await updateUser(body);
            return { data: `User ID (${body['uID']}) has been updated!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to update user data', details: error.message };
          }
        case 'DELETE':
          try {
            await deleteUser(uID);
            return { data: `User ID (${uID}) has been deleted!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to delete user data', details: error.message };
          }
      }
    });
    