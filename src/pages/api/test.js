// pages/api/inventory.js
import { getConnection } from "../../../db";
import sql from "mssql";

export default async function handler(req, res) {
  const { page = 1, limit = 100 } = req.query; // Default to page 1 and limit 100
  const offset = (page - 1) * limit;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("offset", sql.Int, offset)
      .input("limit", sql.Int, limit).query(`
        SELECT * FROM dbo.po_paper
        ORDER BY PO_No
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY;
      `);
    res
      .status(200)
      .json({
        data: { total_pages: Math.ceil(3001 / limit), data: result },
        status: true,
      });
  } catch (error) {
    console.error("Database query failed", error);
    res.status(500).json({ error: "Database query failed" });
  }
}
