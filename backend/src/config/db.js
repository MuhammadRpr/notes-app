import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12801514',
    password: 'QFky2jp1wZ',
    database: 'sql12801514',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,

});

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('Database connection failed');
        throw error;

    }
};