import pgPromise from "pg-promise";

// const pgp = pgPromise();
const pgp = pgPromise({
    query(e) {
        console.log('QUERY:', e.query);
    }
});
const db = pgp(process.env.DATABASE_URL);

export default db;
