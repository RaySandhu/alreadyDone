async function createReward(reward: Reward) {
    const connection = await dbConnect();
    try {
        
        const [results] = await connection.execute(
            'INSERT INTO Reward VALUES (NULL,?,?,?,?,?)',
            [
              reward.name, 
              reward.pointsNeeded, 
              reward.description,
              reward.status,
              reward.hID
            ]
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
      const res = await createReward(body);
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create a reward item', details: error.message };
    }
  });
  