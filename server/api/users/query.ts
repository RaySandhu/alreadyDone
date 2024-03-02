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
        updatedInfo.FName,
        updatedInfo.LName,
        updatedInfo.DOB,
        updatedInfo["Points earned"],
        updatedInfo["PorC-Flag"],
        updatedInfo["User-ID"]
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
      const uID = parseInt(query.uID!.toString()) as number
      const hID = parseInt(query.hID!.toString()) as number
      
      switch (method) {
        case 'GET':
          try {
            const users = await getUser(uID, hID);
            return { data: users };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to fetch user data', details: error.message };
          }
        case 'POST':
          const body = await readBody(event)
          try {
            await updateUser(body);
            return { data: `User ID (${body['User-ID']}) has been updated!` };
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
    