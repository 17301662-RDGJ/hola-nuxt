import { d as defineEventHandler } from '../../_/nitro.mjs';
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
const testDb_get = defineEventHandler(async () => {
  const pool = await sql.connect(config);
  const result = await pool.request().query("SELECT 1 AS ok");
  return result.recordset;
});

export { testDb_get as default };
//# sourceMappingURL=test-db.get.mjs.map
