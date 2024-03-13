
export interface Household {
    'House-ID' : number,
    'Name' : String
}

export interface User {
    'User-ID' : number | null,
    'FName': String,
    'LName': String,
    'DOB': Date,
    'Points earned': number,
    'Google Auth': String,
    'PorC-Flag': String,
    'H-ID': number
}

export interface Food {
    'Food-ID' : number | null,
    'Name' : String,
    'Point value' : number,
    'Quantity' : number,
    'H-ID' : number,
}

export interface Reward {
    'R-ID' : number | null,
    'Name' : String,
    'Points needed' : number,
    'Description' : String,
    'Status' : number,
    'H-ID' : number,
}

export interface RedeemedReward {
    'ReedemID' : number,
    'Date' : Date,
    'U-ID' : number,
}

export interface ConsumedFood {
    'CFood-ID' : number,
    'Date of Consumption' : Date,
    'U-ID' : number,
}

export interface TrashBin {
    'Bin-ID' : number,
    'H-ID' : number,
    'Food-ID' : number,
    'User-ID' : number,
    'Date discarded' : number
}