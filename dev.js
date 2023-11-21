import app from "./api/index.js";
import consola from "consola";

app.listen(4000, () => consola.info("Server started"))
   .on('error', (err) => consola.error(`Error: ${err.message}`));
