import { pool } from "../db.js";


export const http =  async (req, res) => {
     try {
       const [result] = await pool.query("SELECT 13 + 1 AS result");
       res.json(result[0]);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An internal server error occurred." });
     }
   }