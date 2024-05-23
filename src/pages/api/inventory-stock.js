// pages/api/users.js
import { getConnection } from "../../../db";

export default async function handler(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM dbo.inventory_stock_card");
    // const result = await pool
    //   .request()
    //   .query(
    //     "SELECT * FROM dbo.po_paper ORDER BY PO_No OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY"
    //   );
    // const result = await pool.request().query(
    //   `
    //   SELECT * FROM dbo.po_paper
    //   ORDER BY PO_No
    //   OFFSET @offset ROWS
    //   FETCH NEXT @limit ROWS ONLY;
    // `,
    //   {
    //     offset: page * limit,
    //     limit: limit,
    //   }
    // );
    res.status(200).json({ data: result, status: true });
  } catch (error) {
    res.status(500).json({ error: "Database query failed", status: false });
  }
}
