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

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const pool = await sql.connect(config);

  await pool.request().input("texto", sql.NVarChar, body.texto).query(`
      INSERT INTO Mensajes (Texto)
      VALUES (@texto)
    `);

  return { success: true };
});
