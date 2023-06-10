import mysql from 'mysql2';
import 'dotenv';

const connectonPool = mysql.createPool({
  host: process.env['MYSQL_DB_HOST'],
  user: process.env['MYSQL_DB_USER'],
  password: process.env['MYSQL_DB_PASSWORD'],
  database: process.env['MYSQL_DB_DATABASE'],
});

export const run = async (callback: (conn: mysql.PoolConnection) => Promise<void>) => {
  const getConn = () => new Promise<mysql.PoolConnection>((resolve, reject) => {
    connectonPool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      }

      resolve(conn);
    });
  }); 

  const conn = await getConn();
  await callback(conn);
  conn.release();
  return;
}

export const select = <T>(conn: mysql.PoolConnection, sql: string, options: (number | string | boolean)[]=[]) => {
  return new Promise<T>((resolve, reject) => {
    conn.query(sql, options, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result as T);
    });
  });
}