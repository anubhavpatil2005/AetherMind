import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { initializeDatabase } from "./database/init";

const PORT = process.env.PORT || 3001;

async function startServer() {

    await initializeDatabase();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

}

startServer();