async function createTrash(trash: TrashBin) {
  const connection = await dbConnect();
  try {
      
      const [results] = await connection.execute(
          'INSERT INTO \`Trash Bin\` VALUES (NULL,?,?,?,?)',
          [trash.hID, trash.fID, trash.uID, trash.dateDiscarded] // just use the hID as trashBinID
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
    const res = await createTrash(body);
    console.log('Body contents are : ', body)
    return { data: res };
  } catch (error:any) {
    console.error(error); 
    return { error: 'Failed to create a trash', details: error.message };
  }
});
