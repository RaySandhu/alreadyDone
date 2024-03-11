/**
 * Return all or specific food items consumed by a user
 * @param cfID setting to 0 returns all food items consumed by user. 
 *             Else returns specific food items that were consumed
 * @param uID CANNOT be 0. Returns all food items for specified user.
 * @returns list of consumed food items
 */
async function getConsumedFood(cfID : number, uID : number) {
    const connection = await dbConnect();
    try {
      let sql = `SELECT * FROM Consumed_Food WHERE \`U-ID\` = ${uID}`;
      if (cfID != 0) {
        sql + `AND \`CFood-ID\` = ${cfID}`
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
  // Don't think we need an updateConsumedFood -- just delete anything that needs an edit
  // async function updateConsumedFood(updatedInfo:ConsumedFood) {
  //   const connection = await dbConnect();
  //   console.log(updatedInfo);
  //   try {
  //     let sql = `UPDATE Food
  //                SET 
  //                  \`Food-ID\` = ?,
  //                  Quantity    = ?,
  //                  \`Expiry date\` = ?
  //                WHERE \`Food-ID\` = ?;`;
  //     const params = [
  //       updatedInfo["Point value"],
  //       updatedInfo.Quantity,
  //       updatedInfo["Expiry date"],
  //       updatedInfo["Food-ID"]
  //     ];
  
  //     const [results] = await connection.query(sql, params);
  //     console.log(sql, params);
  //     return results;
  //   } catch (err) {
  //     console.error('Error:', err);
  //     throw err;
  //   } finally {
  //     await connection.end();
  //   }
  // }
  
  /**
   * BEWARE since there are no real PKs and duplicates can exist
   * -- all food of one type consumed by one user on a day will be removed. 
   * Will need to recreate all instances if this is not the intent
   * @param consumedFoodInfo instance of logged consumed foods to be deleted
   * @returns list of deleted items
   */
  async function deleteConsumedFood (consumedFoodInfo:ConsumedFood) {
    const connection = await dbConnect()
    try {
      let sql = 'DELETE FROM Consumed_Food WHERE `CFood-ID` = ? AND `Date of Consumption` = ? AND `U-ID` = ?'
      const params: any[] = [consumedFoodInfo["CFood-ID"], consumedFoodInfo["Date of Consumption"], consumedFoodInfo["U-ID"]];
  
      const [results] = await connection.query(sql,params)
      // @ts-ignore
      if (results.affectedRows === 0) {
        throw createError({ statusCode: 404, message: 'Consumed Food not found' });
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
      const cfID = parseInt(query.cfID!.toString()) as number
      const uID = parseInt(query.uID!.toString()) as number
      const doe = new Date(query.doe!.toString()) 

      switch (method) {
        case 'GET':
          try {
            const consumedFood = await getConsumedFood(cfID, uID);
            return { data: consumedFood };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to fetch consumed food data', details: error.message };
          }
        // case 'POST':
        //   const body = await readBody(event)
        //   try {
        //     await updateFood(body);
        //     return { data: `Food ID (${body['Food-ID']}) has been updated!` };
        //   } catch (error:any) {
        //     console.error(error); 
        //     return { error: 'Failed to update food data', details: error.message };
        //   }
        case 'DELETE':
          const toDelete : ConsumedFood = {
            'CFood-ID' : cfID,
            'Date of Consumption' : doe,
            'U-ID' : uID
          }
          try {
            await deleteConsumedFood(toDelete);
            return { data: `Consumed Food of ID type (${cfID}) has been deleted!` };
          } catch (error:any) {
            console.error(error); 
            return { error: 'Failed to delete food data', details: error.message };
          }
      }
    });
    