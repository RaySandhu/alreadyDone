async function creatObtainedReward(oReward: ObtainedReward) {
    const connection = await dbConnect();
    try {
        console.log(              oReward.redeemID,
          oReward.date,
          oReward.uID,)
        const [results] = await connection.execute(
            'INSERT INTO Redeemed_Reward VALUES (?,?,?)',
            [
              oReward.redeemID,
              oReward.date,
              oReward.uID,
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
    console.log(body.redeemID)
    try {
      const res = await creatObtainedReward(body);
      console.log('Body contents are : ', body)
      return { data: res };
    } catch (error:any) {
      console.error(error); 
      return { error: 'Failed to create an obtained reward item', details: error.message };
    }
  });
  