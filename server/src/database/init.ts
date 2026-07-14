import { dbPromise } from "./db";

export async function initializeDatabase() {

    const db = await dbPromise;

    await db.exec(`
        PRAGMA foreign_keys = ON;
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS mindmaps (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            title TEXT NOT NULL,

            description TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE

        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS nodes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            mindmap_id INTEGER NOT NULL,

            parent_id INTEGER,

            title TEXT NOT NULL,

            summary TEXT,

            type TEXT,

            position_x REAL DEFAULT 0,

            position_y REAL DEFAULT 0,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(mindmap_id)
            REFERENCES mindmaps(id)
            ON DELETE CASCADE,

            FOREIGN KEY(parent_id)
            REFERENCES nodes(id)
            ON DELETE CASCADE

        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            node_id INTEGER NOT NULL,

            role TEXT NOT NULL,

            message TEXT NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(node_id)
            REFERENCES nodes(id)
            ON DELETE CASCADE

        );
    `);

    console.log("✅ SQLite Database Initialized");
}