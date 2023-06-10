import mysql from 'mysql2';


const connectonPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'my_first_db',
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