
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
    'Point value' : number,
    'Quantity' : number,
    'Expiry date' : Date,
    'H-ID' : number,
}