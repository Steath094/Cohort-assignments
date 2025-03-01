const userAuthMiddleware = require('../middlewares/userAuth.middleware.js')
const {Router} = require('express')
const {User} = require('../db.js')
const {Course} = require('../db.js')
const {Purchase} = require('../db.js')
const router = Router();
router.get('/preview/:courseId',async (req,res) => {
    try {
        const {courseId}=req.params;
        const course = await Course.findOne({_id: courseId})
        if (!course) {
            return res.status(404).json({ message: "Course not found" }); 
        }
        return res.status(200).json({
            message: "Course Fetched Successfully",
            Course
        });
    } catch (error) {
        console.error("Course Preview Failed", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;