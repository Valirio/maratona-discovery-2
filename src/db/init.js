const Database = require('./config')

const initDb = {
        async init(){         
            const db = await Database();

            await db.exec(`
                CREATE TABLE profile (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT, 
                    avatar TEXT, 
                    monthly_budget INT, 
                    days_per_week INT,
                    hours_per_day INT,
                    vacation_per_year INT,
                    value_hour INT,
                    total_value_done INT,
                    thema TEXT
                );`
            );

            await db.exec(`
                CREATE TABLE jobs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    daily_hours INT,
                    total_hours INT,
                    total_value_final INT,
                    status INT, 
                    created_at DATETIME
                );`
            );

            await db.run(`
                INSERT INTO profile (
                    name, 
                    avatar, 
                    monthly_budget, 
                    days_per_week, 
                    hours_per_day, 
                    vacation_per_year,
                    value_hour
                ) VALUES (
                    "Valirio",
                    "https://github.com/Valirio.png",
                    3000,
                    5,
                    5,
                    4,
                    70,
                    "dark"
                ), (
                    "Valirio2",
                    "https://github.com/Valirio.png",
                    1500,
                    4,
                    8,
                    5,
                    65,
                    "light"
                );`
            );

            await db.run(`
                INSERT INTO jobs (
                    name, 
                    daily_hours,
                    total_hours,
                    created_at
                ) VALUES (
                    "Pizzaria Guloso",
                    2,
                    1,
                    1617514376018
                );`
            );

            await db.run(`
                INSERT INTO jobs (
                    name, 
                    daily_hours,
                    total_hours,
                    created_at
                ) VALUES (
                    "OneTwo Projects",
                    3,
                    47,
                    1617514376018
                );`
            );

            await db.close();
        }
};


initDb.init();