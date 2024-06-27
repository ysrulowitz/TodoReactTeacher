import { Router } from "express";
import { login } from "../controllers/auth.js";
const router = Router();


/**
 * Body : {email, password}
 */
router.post('/login', async (req, res, next) => {
    console.log('>>>>>>>', req.body)
    try{
        let user = await login(req.body.username, req.body.password);
        console.log('SUC')
        res.json({
            user_id : user.id
        })
    }catch(e){
        console.log('ERR')

        next(e);
    }
})


export default router;