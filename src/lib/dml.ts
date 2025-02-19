import { pool } from "@/lib/db";

export type UpdateResult = {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
};

export async function sql<T>(
  query: string,
  params: (string | number)[]
): Promise<T[]> {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn.query(query, params);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

export async function execute<UpdateResult>(
  query: string,
  params: (string | number)[]
): Promise<UpdateResult> {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query, params);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}
