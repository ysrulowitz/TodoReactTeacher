import { Router } from "express";
import passport from "passport";
const router = Router();


router.use(passport.authenticate('cookie', {
  session: false
}))
import { createTask, deleteTask, getTasks, markTaskAsDone } from "../controllers/tasks.js";

router.post("/", async (req, res, next) => {
  console.log(req.body.title, req.body.user_id)
  try {
    res.json(await createTask(req.body.title, req.body.user_id));
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
    res.json(await markTaskAsDone(req.params.id));
  } catch(e){
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(await deleteTask(req.params.id));
  } catch(e){
    next(e);
  }
});

router.post("/add-image", (req, res, next) => {});

export default router;
