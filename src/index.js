import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
  app.listen(process.env.PORT | 8000);
  console.log(`Server online on port ${process.env.PORT | 8000}`);
}

main();