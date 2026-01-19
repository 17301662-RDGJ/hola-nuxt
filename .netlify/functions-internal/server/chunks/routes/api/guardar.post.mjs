import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import sql from 'mssql';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const config = {
  user: "appuser",
  password: "rdgj123456789!",
  server: "localhost",
  database: "NuxtDB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};
const guardar_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const pool = await sql.connect(config);
  await pool.request().input("texto", sql.NVarChar, body.texto).query(`
      INSERT INTO Mensajes (Texto)
      VALUES (@texto)
    `);
  return { success: true };
});

export { guardar_post as default };
//# sourceMappingURL=guardar.post.mjs.map
