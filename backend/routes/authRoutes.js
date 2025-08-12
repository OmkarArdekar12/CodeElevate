import { Router } from "express";
import passport from "passport";

const router = Router();

//Registration Route
router.post("/register", register);
//Login Route
router.post("/login", login);
//Logout Route
router.post("/logout", register);
