const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'already_done_user',
  password: 'already_done_password',
  database: 'already_done_database'
});


connection.connect((err) => {
  if (err) {
    console.error('Error: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;