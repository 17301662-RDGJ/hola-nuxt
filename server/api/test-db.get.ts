import sql from "mssql";

const config = {
  user: "appuser",
  password: "rdgj123456789!",
  server: "localhost",
  database: "NuxtDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default defineEventHandler(async () => {
  const pool = await sql.connect(config);
  const result = await pool.request().query("SELECT 1 AS ok");
  return result.recordset;
});
