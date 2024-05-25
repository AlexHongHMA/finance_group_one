// // pages/api/inventory.js
// import { getConnection } from "../../../db";
// import sql from "mssql";

// export default async function handler(req, res) {
//   const pool = await getConnection();
//   if (req.method === "POST") {
//     try {
//       const { search } = req.body;
//       const result = await pool
//         .request()
//         .input("customer_id", sql.VarChar, search).query(`
//         SELECT * FROM dbo.Finance
//         WHERE Customer_ID = @customer_id;
//       `);
//       res.status(200).json({
//         data: {
//           total_pages:
//             result?.rowsAffected[0] < 10
//               ? result?.rowsAffected[0]
//               : Math.ceil(result?.rowsAffected[0] / 10),
//           data: result,
//         },
//         status: true,
//       });
//     } catch (error) {
//       console.error("Database query failed", error);
//       res.status(500).json({ error: "Database query failed" });
//     }
//   } else {
//     try {
//       const { page = 1, limit = 100 } = req.query; // Default to page 1 and limit 100
//       const offset = (page - 1) * limit;
//       const result = await pool
//         .request()
//         .input("offset", sql.Int, offset)
//         .input("limit", sql.Int, limit).query(`
//     SELECT * FROM dbo.Finance
//     ORDER BY Customer_ID
//     OFFSET @offset ROWS
//     FETCH NEXT @limit ROWS ONLY;
//   `);
//       res.status(200).json({
//         data: { total_pages: Math.ceil(3001 / limit), data: result },
//         status: true,
//       });
//     } catch (error) {
//       console.error("Database query failed", error);
//       res.status(500).json({ error: "Database query failed" });
//     }
//   }
// }

// pages/api/users.js
import { getConnection } from "../../../db";

export default async function handler(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM dbo.Finance");
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
