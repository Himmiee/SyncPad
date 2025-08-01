import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`lit at http://localhost:${PORT}`);
});
