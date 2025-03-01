const authMiddleware = require('../middlewares/auth.middleware.js')
const {Router} = require('express')
const {Admin} = require('../db.js')
const {Course} = require('../db.js')
const {z} = require("zod")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Admin routes
const router = Router();
router.post('/signup', async (req, res) => {
    // logic to sign up admin
    try {
        const requiredBody = z.object({
            fullName: z.string().min(1, "Full name is required"),
            email: z.string().email("Invalid email format"),
            password: z.string().min(8, "Password must be at least 8 characters").max(100)
        })
        const parseData =  requiredBody.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                message: "Invalid input format",
                errors: parseData.error.format()
            })
            
        }
        const { fullName, email, password } = parseData.data;
        const hashedPass = await bcrypt.hash(password,10);
        await Admin.create({
            email,
            fullName,
            password: hashedPass
        })
        
        return res.status(201).json({
            message: "Admin Signed Up successfully"
        });
    } catch (error) {
        console.error("Admin Signup Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    try {
        const requiredBody = z.object({
            email: z.string().email("Invalid email format"),
            password: z.string().min(8, "Password must be at least 8 characters").max(100)
        })
        const parseData =  requiredBody.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                message: "Invalid input format",
                errors: parseData.error.format()
            })
        }
        const { email, password } = parseData.data;
        const admin = await Admin.findOne({
            email
        })
        if (!admin) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const correctPassword = await bcrypt.compare(password,admin.password);
        if (!correctPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({id: admin._id},process.env.JWT_ADMIN_SECRET);
        return res.status(200).json({
            message: "Admin Loggedin Successfully",
            token
        })
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/courses',authMiddleware,async (req, res) => {
    // logic to create a course
    try {
        const userId = req.adminId;
        const schema = z.object({
            title: z.string()
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title cannot exceed 100 characters")
                .trim(), // Trim whitespace
            description: z.string()
                .min(10, "Description must be at least 10 characters"),
            price: z.number()
                .min(0, "Price must be a positive number"),
            imageUrl: z.string().url("Invalid image URL format"), // Ensure valid URL
        }); 
        const parseData = schema.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                message: "Invalid input format",
                errors: parseData.error.format()
            });
        }
        const {title,description,price,imageUrl} = parseData.data;
        const existingCourse = await Course.findOne({ owner: userId,title });
        if (existingCourse) {
            return res.status(409).json({ message: "A course created by you with this title already exists" });
        }
        const course = await Course.create({
            title,
            description,
            price,
            imageUrl,
            owner: userId
        })
        return res.status(201).json({
            message: "Course created successfully",
            course: {
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageUrl: course.imageUrl
            }
        });
    } catch (error) {
        console.error("Course Creation Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/courses/:courseId',authMiddleware,async (req, res) => {
    // logic to edit a course
    try {
        const userId = req.adminId;
        const {courseId} =req.params;

        const schema = z.object({
            title: z.string()
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title cannot exceed 100 characters")
                .trim(), // Trim whitespace
            description: z.string()
                .min(10, "Description must be at least 10 characters"),
            price: z.number()
                .min(0, "Price must be a positive number"),
            imageUrl: z.string().url("Invalid image URL format"),
        });
        const parseData = schema.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                message: "Invalid input format",
                errors: parseData.error.format()
            });
        }
        const updatedCourse = await Course.findOneAndUpdate(
            { _id: courseId, owner: userId },
            { $set: parseData.data },  
            { new: true, runValidators: true }  
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        return res.status(200).json({
            message: "Course updated successfully",
            course: {
                id: updatedCourse._id,
                title: updatedCourse.title,
                description: updatedCourse.description,
                price: updatedCourse.price,
                imageUrl: updatedCourse.imageUrl
            }
        });

    } catch (error) {
        console.error("Course Update Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courses',authMiddleware, async (req, res) => {
    // logic to get all courses
    try {
        const userId = req.adminId;
        const courses = await Course.find({owner:userId})
        if (courses.length === 0) {
            return res.status(200).json({
                message: "No courses found",
                courses: []
            });
        }

        return res.status(200).json({
            message: "Courses fetched successfully",
            courses
        });
    } catch (error) {
        console.error("Course Fetch Failed ",error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

