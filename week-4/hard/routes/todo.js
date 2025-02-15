const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const {Todo} = require('../database/index.js');
const router = Router();
const ApiError = require('../utils/ApiError.js')
// todo Routes
router.post('/',adminMiddleware,async (req, res) => {
    // Implement todo creation logic
    const {title,description,category} = req.body;
    if (
        [title,description,category].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required to create Todo")
    }
    const userId = req.user._id;
    const existedTodo = await Todo.findOne({title,owner: userId});
    if (existedTodo) {
        throw new ApiError(409,"Todo with this title already exist");
    }
    const todo = await Todo.create({
        title,description,category,owner: userId
    })
    return res
    .status(201)
    .json(
        new ApiResponse(200, todo, "Todo created Successfully")
    );
});

router.put('/:id', adminMiddleware, async (req, res) => {
    // Implement update todo  logic
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Todo ID")
    }
    const {title,description,category} = req.body;
    if (
        [title,description,category].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Some field are missing while updating todo")
    }
    const userId = req.user._id;
    const UpdatedTodo = await Todo.findOneAndUpdate(
        {
            _id: id,
            owner: userId
        },{
            $set:{
                title,
                description,
                category
            }
        }
    )
    return res
    .status(201)
    .json(
        new ApiResponse(200, UpdatedTodo, "Todo Updated Successfully")
    );
});

router.delete('/', adminMiddleware, async (req, res) => {
    // Implement delete todo logic
    const userId = req.user._id;
    const result = await Todo.deleteMany({
        owner: userId
    })
    if (result.deletedCount === 0) {
        throw new ApiError(400,"Todo not found or you do not have permission to delete it")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,[],"All Todo Deleted Succesfully")
    )

});

router.delete('/:id', adminMiddleware,async (req, res) => {
    // Implement delete todo by id logic
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Todo ID")
    }
    const userId = req.user._id;
    const result = await Todo.deleteOne({
        _id: id,
        owner: userId
    })
    if (result.deletedCount === 0) {
        throw new ApiError(400,"Todo not found or you do not have permission to delete it")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,[],"Todo Deleted Succesfully")
    )
});


router.get('/', adminMiddleware,async (req, res) => {
    // Implement fetching all todo logic
    const { userId } = req.params;

    try {
      // Fetch all TODOs for the given userId
      const todos = await Todo.find({ userId });
  
      if (!todos.length) {
        return res.status(404).json(new ApiResponse(200,[],"Todos not found"));
      }
  
      return res.status(200).json(new ApiResponse(200,todos,"Todos fetched successfully"));
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/:id', adminMiddleware,async (req, res) => {
    // Implement fetching todo by id logic
     const {id} = req.params
     if (!mongoose.Types.ObjectId.isValid(id)) {
         throw new ApiError(400, "Invalid Todo ID")
     }
     const userId = req.user._id;
     const todo = await Todo.findOne({
        _id: id,
        owner: userId
     })
     if (!todo) {
         throw new ApiError(400,"Todo not found")
     }
     return res
     .status(200)
     .json(
         new ApiResponse(200,todo,"Todo Fetched Succesfully")
     )
});

module.exports = router;