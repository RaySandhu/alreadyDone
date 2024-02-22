async function getHousehold(id : number) {
  const connection = await dbConnect();
  try {
    let sql = 'SELECT * FROM Household';
    const params: number[] = [];

    if (id != 0) {
      sql += ' WHERE `House-ID` = ?';
      params.push(id);
    }

    const [results] = await connection.query(sql, params);
    return results;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  } finally {
    await connection.end();
  }
}

async function deleteHousehold (id: number) {
  const connection = await dbConnect()
  try {
    let sql = 'DELETE FROM Household WHERE `House-ID` = ?'
    const params: number[] = [id];

    const [results] = await connection.query(sql,params)

    // if (results.affectedRows === 0) {
    //   throw createError({ statusCode: 404, message: 'Household not found' });
    // }
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
    const id = (parseInt(event.context.params!.id) as number)

    switch (method) {
      case 'GET':
        try {
          const households = await getHousehold(id);
          return { data: households };
        } catch (error:any) {
          console.error(error); 
          return { error: 'Failed to fetch household data', details: error.message };
        }
      case 'DELETE':
        try {
          await deleteHousehold(id);
          return { data: `Household ID (${id}) has been deleted!` };
        } catch (error:any) {
          console.error(error); 
          return { error: 'Failed to delete household data', details: error.message };
        }
    }
  });
  