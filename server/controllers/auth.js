import db from "./db.js";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";

export const login = async (username, password) => {
  const user = await db.oneOrNone(
    "SELECT * FROM todoapp.person WHERE name = ${username}",
    {
      username,
    }
  );

  if (!user) throw boom.forbidden("User does not exist");
  let isPasswordCompared = await bcrypt.compare(password, user.pass);

  if(!isPasswordCompared){
      throw boom.forbidden('Password does not match');
  }

  return user;
};
