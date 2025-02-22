const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const {Todo} = require('../database/index.js');
const router = Router();
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse.js')
const mongoose = require("mongoose")
// todo Routes
router.use(adminMiddleware)
router.post('/',async (req, res) => {
    // Implement todo creation logic
    const {title,description,category,difficulty} = req.body;
    if (
        [title,description,category,difficulty].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required to create Todo")
    }
    const userId = req.user._id;
    const todo = await Todo.create({
        title,description,category,difficulty,owner: userId
    })
    return res
    .status(201)
    .json(
        new ApiResponse(200, todo, "Todo created Successfully")
    );
});

router.put('/:id', async (req, res) => {
    // Implement update todo  logic
    const {id} = req.params
    console.log(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Todo ID")
    }
    const {category} = req.body;
    if (category?.trim() === "") {
        throw new ApiError(400, "Some field are missing while updating todo")
    }
    const userId = req.user._id;
    const UpdatedTodo = await Todo.findOneAndUpdate(
        {
            _id: id,
            owner: userId
        },{
            $set:{
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

router.delete('/', async (req, res) => {
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

router.delete('/:id',async (req, res) => {
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


router.get('/',async (req, res) => {
    // Implement fetching all todo logic
    
    try {
      // Fetch all TODOs for the given userId
      const todos = await Todo.find({ userId: req.userId });
  
      if (!todos.length) {
        return res.status(404).json(new ApiResponse(200,[],"Todos not found"));
      }
  
      return res.status(200).json(new ApiResponse(200,todos,"Todos fetched successfully"));
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/:id',async (req, res) => {
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