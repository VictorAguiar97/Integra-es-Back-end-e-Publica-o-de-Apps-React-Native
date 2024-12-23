import { SQLiteDatabase } from "expo-sqlite";

export const DATABASE_NAME = 'app.db';
export const TB_CIDADES_NAME = 'cidades'
const DATABASE_VERSION = 1;

const CREATE_TB_CIDADES = `
     CREATE TABLE IF NOT EXISTS ${TB_CIDADES_NAME} (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        pais TEXT NOT NULL,
        passaporte TEXT NOT NULL,
        updated_at DATE NOT NULL
     );`;

export const INSERT_DB_CIDADES = `INSERT INTO ${TB_CIDADES_NAME} (
                name, pais, passaporte, updated_at
        ) VALUES (?, ?, ?, ?)`;

export const SELECT_CIDADES_ALL = `SELECT * FROM ${TB_CIDADES_NAME}`;

export async function migrateDb(db: SQLiteDatabase) {
    try {
        let response = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
        let { user_version: dbVersion } = response ?? { user_version: 0 };
        if (dbVersion >= DATABASE_VERSION) return;
        if (dbVersion === 0) {
            await db.execAsync(`${CREATE_TB_CIDADES}`);
        }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        const err = error as { message: string };
        console.log(err.message);
    }
}