
export interface Household {
    'House-ID' : number,
    'Name' : String
}

export interface User {
    'uID' : number | null,
    'fName': String,
    'lName': String,
    'dob': Date,
    'pointsEarned': number,
    'googleAuth': String,
    'PorCFlag': String,
    'hID': number
}

export interface Food {
    'fID' : number | null,
    'name' : String,
    'pointValue' : number,
    'quantity' : number,
    'hID' : number,
}

export interface Reward {
    'rID' : number | null,
    'name' : String,
    'pointsNeeded' : number,
    'description' : String,
    'status' : number,
    'hID' : number,
}

export interface ObtainedReward {
    'redeemID' : number,
    'date' : Date,
    'uID' : number,
}

export interface ConsumedFood {
    'cFoodID' : number,
    'dateOfConsumption' : Date,
    'uID' : number,
}

export interface TrashBin {
    'binID' : number,
    'hID' : number,
    'fID' : number,
    'uID' : number,
    'dateDiscarded' : number
}