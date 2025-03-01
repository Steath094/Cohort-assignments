const userAuthMiddleware = require('../middlewares/userAuth.middleware.js')
const {Router} = require('express')
const {User} = require('../db.js')
const {Course} = require('../db.js')
const {Purchase} = require('../db.js')
const router = Router();
// User routes
router.post('/signup',async (req, res) => {
    // logic to sign up user
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
        await User.create({
            email,
            fullName,
            password: hashedPass
        })
        
        return res.status(201).json({
            message: "User Signed Up successfully"
        });
    } catch (error) {
        console.error("User Signup Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login',async (req, res) => {
    // logic to log in user
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
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const correctPassword = await bcrypt.compare(password,user.password);
        if (!correctPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({id: user._id},process.env.JWT_USER_SECRET);
        return res.status(200).json({
            message: "Admin Loggedin Successfully",
            token
        })
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = "-createdAt" } = req.query;
        const pageNum = Math.max(1, parseInt(page, 10)); 
        const limitNum = Math.max(1, parseInt(limit, 10));

        const courses = await Course.find({})
            .sort(sort) 
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum) // Limit results
            .select("title description price imageUrl createdAt");
        const totalCourses = await Course.countDocuments();
        return res.status(200).json({
            message: "Courses fetched successfully",
            totalCourses,
            totalPages: Math.ceil(totalCourses / limitNum),
            currentPage: pageNum,
            courses
        });

    } catch (error) {
        console.error("Course Fetch Failed", error);
        return res.status(500).json({ message: "Failed to fetch courses" });
    }
});

router.post('/courses/:courseId', userAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId } = req.params;

        const courseExists = await Course.exists({ _id: courseId });
        if (!courseExists) {
            return res.status(404).json({ message: "Course not found" });
        }
        const alreadyPurchased = await Purchase.findOne({ userId, courseId });
        if (alreadyPurchased) {
            return res.status(400).json({ message: "You have already purchased this course" });
        }
        const purchase = await Purchase.create({ userId, courseId });

        return res.status(201).json({
            message: "Course purchased successfully",
            purchaseId: purchase._id
        });

    } catch (error) {
        console.error("Course Purchase Failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/purchases', userAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        // Check if the user has any purchased courses
        const hasPurchases = await Purchase.exists({ userId });
        if (!hasPurchases) {
            return res.status(200).json({
                message: "No purchased courses found",
                purchasedCourses: []
            });
        }

        // Fetch purchased courses with details
        const purchasedCourses = await Purchase.find({ userId })
            .populate("courseId", "title description price imageUrl") // Get course details
            .lean(); // Convert to plain JSON for better performance

        return res.status(200).json({
            message: "Purchased courses fetched successfully",
            purchasedCourses
        });

    } catch (error) {
        console.error("Purchased Course Fetching Failed:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
