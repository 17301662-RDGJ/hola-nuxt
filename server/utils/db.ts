import sql from "mssql";

const config = {
  server: "RocioJimenez", // 👈 EXACTAMENTE como en SSMS
  database: "NuxtDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
