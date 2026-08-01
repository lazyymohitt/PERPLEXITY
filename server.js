import "dotenv/config"
import app from "./src/app.js"
import {connectToDB} from "./src/config/database.js"

const PORT = process.env.PORT || 8000

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });