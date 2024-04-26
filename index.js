import http from "http";
import { connect } from '@tidbcloud/serverless';

const server = http.createServer(async (req, res) => {
  const conn = connect({ debug: true, url: process.env.DB_CONNECTING_URL });
  const tx = await conn.begin();
  try {
    await Promise.all([
      tx.execute("select * from test"),
      tx.execute("select * from test")
    ]);
    await tx.commit();
    res.end('ok')
  }catch(err) {
    await tx.rollback();
    throw err;
  }
})
console.log("open http://localhost:4000 in browser")
server.listen(4000);
