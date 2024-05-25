// pages/api/users.js
import { getConnection } from "../../../db";

export default async function handler(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.monthly_income_statement");

    res.status(200).json({ data: result, status: true });
  } catch (error) {
    res.status(500).json({ error: "Database query failed", status: false });
  }
}
