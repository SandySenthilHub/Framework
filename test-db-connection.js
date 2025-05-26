const sql = require('mssql');

// Configuration for your SQL Server connection
const config = {
   user: process.env.SQL_USER ,
  password: process.env.SQL_PASSWORD ,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE ,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    port: 1433,
    connectionTimeout: 30000,
    requestTimeout: 30000,
    enableArithAbort: true,
    connectTimeout: 30000
  }
};

async function checkUserManagementTable() {
  try {
    console.log('Connecting to SQL Server...');
    const pool = await sql.connect(config);
    console.log('Connected successfully!');

    // Get UserManagement table structure
    console.log('\n=== UserManagement Table Structure ===');
    const columns = await pool.request().query(`
      SELECT 
        COLUMN_NAME,
        DATA_TYPE,
        IS_NULLABLE,
        CHARACTER_MAXIMUM_LENGTH,
        COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'UserManagement'
      ORDER BY ORDINAL_POSITION
    `);

    if (columns.recordset.length === 0) {
      console.log('UserManagement table not found!');

      // Let's see what tables exist
      console.log('\n=== Available Tables ===');
      const tables = await pool.request().query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_NAME
      `);

      console.log('Available tables:');
      tables.recordset.forEach(table => {
        console.log(`- ${table.TABLE_NAME}`);
      });
    } else {
      console.log('UserManagement table columns:');
      columns.recordset.forEach(col => {
        console.log(`- ${col.COLUMN_NAME}: ${col.DATA_TYPE}${col.CHARACTER_MAXIMUM_LENGTH ? `(${col.CHARACTER_MAXIMUM_LENGTH})` : ''} ${col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'}`);
      });

      // Get sample data
      console.log('\n=== Sample Data (Top 3 rows) ===');
      const sampleData = await pool.request().query('SELECT TOP 3 * FROM UserManagement');
      console.log('Sample records:');
      console.log(JSON.stringify(sampleData.recordset, null, 2));
    }

    await pool.close();
    console.log('\nConnection closed.');

  } catch (error) {
    console.error('Connection error:', error.message);
    console.error('Details:', error);
  }
}

checkUserManagementTable();