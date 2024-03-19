/*
    fID = 0 will return all food in Household
    set hID = 0 as convention if querying all food
*/
async function getFood(fID : number, hID : number) {
    const connection = await dbConnect();

    if (fID == 0) {
      try {
        let sql = `SELECT * FROM Food WHERE \`H-ID\` = ${hID}`;
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
        let sql = `SELECT * FROM Food WHERE \`Food-ID\` = ${fID}`;
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
  
  async function updateFood(updatedInfo:Food) {
    const connection = await dbConnect();
    console.log(updatedInfo);
    try {
      let sql = `UPDATE Food
                 SET 
                   Name        = ?,
                   Quantity    = ?,
                   \`Point value\` = ?
                 WHERE \`Food-ID\` = ?;`;
      const params = [
        updatedInfo['name'],
        updatedInfo.quantity,
        updatedInfo.pointValue,
        updatedInfo.fID,
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
  
  async function deleteFood (fID: number) {
    const connection = await dbConnect()
    try {
      let sql = 'DELETE FROM Food WHERE `Food-ID` = ?'
      const params: number[] = [fID];
  
      const [results] = await connection.query(sql,params)
      // @ts-ignore
      if (results.affectedRows === 0) {
        throw createError({ statusCode: 404, message: 'Food not found' });
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
      const fID = parseInt(query.fID!.toString()) as number
      const hID = parseInt(query.hID!.toString()) as number
      
      switch (method) {
        case 'GET':
          try {
            const food = await getFood(fID, hID);
            return { data: food };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to fetch food data', details: error.message };
          }
        case 'POST':
          const body = await readBody(event)
          try {
            await updateFood(body);
            return { data: `Food ID (${fID}) has been updated!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to update food data', details: error.message };
          }
        case 'DELETE':
          try {
            await deleteFood(fID);
            return { data: `Food ID (${fID}) has been deleted!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to delete food data', details: error.message };
          }
      }
    });
    