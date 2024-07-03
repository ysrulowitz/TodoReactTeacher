"use strict";
import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();


router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    const token = jwt.sign(
      { user: req.user },
      "a-very-very-strong-and-super-secret-secret"
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        path: "/",
        domain: ".localhost",
        secure: false,
        sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
        maxAge: 3600000, 
      })
      .json({ ok: true });
  }
);

export default router;
