/**
 * Return all or specific reward items obtained by a user
 * @param orID setting to 0 returns all reward items obtained by user. 
 *             Else returns specific reward items that were obtained
 * @param uID CANNOT be 0. Returns all reward items for specified user.
 * @returns list of obtained reward items
 */
async function getObtainedReward(orID : number, uID : number) {
    const connection = await dbConnect();
    try {
      let sql = `SELECT * FROM Redeemed_Reward WHERE \`U-ID\` = ${uID}`;
      if (orID != 0) {
        sql + `AND \`RedeemID\` = ${orID}`
      }
      const [results] = await connection.query(sql);
      console.log(sql)
      return results;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    } finally {
      await connection.end();
    }
  }
  
  /**
   * BEWARE since there are no real PKs and duplicates can exist
   * -- all reward of one type obtained by one user on a day will be removed. 
   * Will need to recreate all instances if this is not the intent
   * @param obtainedRewardInfo instance of logged obtained rewards to be deleted
   * @returns list of deleted items
   */
  async function deleteObtainedReward (obtainedRewardInfo:ObtainedReward) {
    const connection = await dbConnect()
    try {
      let sql = 'DELETE FROM Redeemed_Reward WHERE `RedeemID` = ? AND `Date of Consumption` = ? AND `U-ID` = ?'
      const params: any[] = [obtainedRewardInfo.redeemID, obtainedRewardInfo.date, obtainedRewardInfo.uID];
  
      const [results] = await connection.query(sql,params)
      // @ts-ignore
      if (results.affectedRows === 0) {
        throw createError({ statusCode: 404, message: 'Obtained Reward not found' });
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
      const orID = parseInt(query.orID!.toString()) as number
      const uID = parseInt(query.uID!.toString()) as number
      const date = new Date(query.date!.toString()) 

      switch (method) {
        case 'GET':
          try {
            const obtainedReward = await getObtainedReward(orID, uID);
            return { data: obtainedReward };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to fetch obtained reward data', details: error.message };
          }
        case 'DELETE':
          const toDelete : ObtainedReward = {
            'redeemID' : orID,
            'date' : date,
            'uID' : uID
          }
          try {
            await deleteObtainedReward(toDelete);
            return { data: `Obtained Reward of ID (${orID}) has been deleted!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to delete reward data', details: error.message };
          }
      }
    });
    