import mysql from 'mysql2/promise'

export default function createDbConnection() {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
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