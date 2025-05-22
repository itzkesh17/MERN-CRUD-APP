import user from "../Schema/userSchema.js"


export const createUser = async(req,res)=>{

    const newUser = new user(
        {
            username: req.body.username,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            city: req.body.city
        }
    )

    try {
        const savedUser = await newUser.save()
        res.status(201).json(
            {
                success: true,
                message: "data sent successfully",
                data: savedUser
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error while posting user details",
                error: error.message
            }
        )
    }
}

export const readAllUsers = async(req,res)=>{
    try {
        const getAllUser = await user.find()
        res.status(201).json(
            {
                success: true,
                message: "got the all users",
                data: getAllUser
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while getting users",
            error: error.message
        })
    }
}

export const readUser = async(req,res)=>{

    try {
        const findUser = await user.findById(req.params.id)

        if(findUser === null){
            res.status(404).json(
                {
                    success: false,
                    message: "cannot find user"
                }
            )
        }
        else{
            res.status(201).json
            (
                {
                    success: true,
                    message: "got the user",
                    data: findUser
                }
            )
        }
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "error while finding movie",
                error: error.message
            }
        )
    }
}

export const updateUser = async(req,res)=>{

    try {
        const userId = req.params.id;

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        if(updateUser === null){
            res.status(404).json({
                success: false,
                message: "cannot find user to update"
            })
        }
        else{
            res.status(201).json({
                success: true,
                message: "user details updated successfully",
                data: updatedUser
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while updating user details",
            error: error.message
        })
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id;

        const deletedUser = await user.findByIdAndDelete(userId)

        if(!deletedUser){
            res.status(404).json({
                success: false,
                message: "cannot find the user to delete"
            })
        }
        else{
            res.status(201).json({
                success: true,
                message: "user details deleted successfully"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while deleting details"
        })        
    }
}