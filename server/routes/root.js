import { Router } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import CookieStrategy from 'passport-cookie';
import bcrypt from "bcrypt";
import db from "../controllers/db.js";
import jwt from 'jsonwebtoken'

async function verify(username, password, done) {
  const user = await db.oneOrNone(
    "SELECT * FROM todoapp.person WHERE name = ${username}",
    {
      username,
    }
  );

  if (!user)
    return done(null, false, { message: "Incorrect username or password." });
  let isPasswordCompared = await bcrypt.compare(password, user.pass);

  if (!isPasswordCompared) {
    return done(null, false, { message: "Incorrect username or password." });
  }

  return done(null, user);
}

function verifyCookie(token, done) {
console.log("verifycoo",token)
  const result = jwt.verify(token, "a-very-very-strong-and-super-secret-secret")
  console.log("verify", result)
  return done(null, result.user);
}

const localStrategy = new LocalStrategy(verify);
passport.use(localStrategy);

const cookieStrategy = new CookieStrategy(verifyCookie);
passport.use(cookieStrategy);

const router = Router();

// router.post('/', (req, res, next) => {
//     next(new Error('This is a bad request'));
// })

// router.all("/", (req, res, next) => {
//   console.log("/ was called");
//   next();
// });

// router.get("/", (req, res, next) => {
//   console.log("Incoming to /");
//   res.send("Server is up and running");
// });


export default router;