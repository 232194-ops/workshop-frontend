const mysql = require('mysql2/promise');

async function main() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'jose',
      database: 'dbmechanicalworkshop'
    });

    console.log('--- USERS ---');
    const [users] = await connection.query('SELECT * FROM tuser');
    console.log(JSON.stringify(users, null, 2));

    console.log('--- CUSTOMERS ---');
    const [customers] = await connection.query('SELECT * FROM tcustomer');
    console.log(JSON.stringify(customers, null, 2));

  } catch (error) {
    console.error('Error connecting or querying database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
