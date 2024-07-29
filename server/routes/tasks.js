import { Router } from "express";
import multer from "multer";
import passport from "passport";
import { createTask, deleteTask, getTasks, markTaskAsDone } from "../controllers/tasks.js";

const upload = multer({
  dest: "./uploads"
})

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit size to 2MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only image files are allowed!'));
//   },
// })

const router = Router();

router.use(passport.authenticate('cookie', {
  session: false
}))

router.post("/",upload.single("taskImg"), async (req, res, next) => {
  console.log(req.body.title, req.user.id)
  try {
    let url = "placeholder"
    if (req.file && req.file.filename) {
      url = req.file.filename; 
    }
        res.json(await createTask(req.body.title, req.user.id, url));
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

router.post("/add-image", upload.single("taskImg"), (req, res, next) => {
  res.send({
    succses: "true",
    url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
  })

});

export default router;
