/*
    rID = 0 will return all reward in Household
    set hID = 0 as convention if querying all rewards in a household
*/
async function getReward(rID : number, hID : number) {
    const connection = await dbConnect();

    if (rID == 0) {
      try {
        let sql = `SELECT * FROM Reward WHERE \`H-ID\` = ${hID}`;
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
        let sql = `SELECT * FROM Reward WHERE \`R-ID\` = ${rID}`;
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

  async function updateReward(updatedInfo:Reward) {
    const connection = await dbConnect();
    console.log(updatedInfo);
    try {
      let sql = `UPDATE Reward
                 SET 
                   Name                 = ?,
                   \`Points needed\`    = ?,
                   Description          = ?,
                   Status               = ?
                 WHERE \`R-ID\` = ?;`;
      const params = [
        updatedInfo.name,
        updatedInfo.pointsNeeded,
        updatedInfo.description,
        updatedInfo.status,
        updatedInfo.rID
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
  
  async function deleteReward (rID: number) {
    const connection = await dbConnect()
    try {
      let sql = 'DELETE FROM Reward WHERE `R-ID` = ?'
      const params: number[] = [rID];
  
      const [results] = await connection.query(sql,params)
      // @ts-ignore
      if (results.affectedRows === 0) {
        throw createError({ statusCode: 404, message: 'Reward not found' });
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
      const rID = parseInt(query.rID!.toString()) as number
      const hID = parseInt(query.hID!.toString()) as number
      
      switch (method) {
        case 'GET':
          try {
            const reward = await getReward(rID, hID);
            return { data: reward };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to fetch reward data', details: error.message };
          }
        case 'POST':
          const body = await readBody(event)
          try {
            await updateReward(body);
            return { data: `Reward ID (${body['R-ID']}) has been updated!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to update reward data', details: error.message };
          }
        case 'DELETE':
          try {
            await deleteReward(rID);
            return { data: `Reward ID (${rID}) has been deleted!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to delete reward data', details: error.message };
          }
      }
    });
    