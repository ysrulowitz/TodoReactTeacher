import { Router } from "express";
import passport from "passport";
import { createTask, deleteTask, getTasks, markTaskAsDone } from "../controllers/tasks.js";

const router = Router();

router.use(passport.authenticate('cookie', {
  session: false
}))

router.post("/", async (req, res, next) => {
  console.log(req.body.title, req.user.id)
  try {
    res.json(await createTask(req.body.title, req.user.id));
  } catch (e) {
    // res.json(e)
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  
  try {
    const tasks= await getTasks(req.user.id)
    res.json(tasks)
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try{
    res.json(await markTaskAsDone(req.params.id, req.user.id));
  } catch(e){
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(await deleteTask(req.params.id, req.user.id));
  } catch(e){
    next(e);
  }
});

router.post("/add-image", (req, res, next) => {});

export default router;
