const User = require('../models/userModels');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErr = require('../middleWare/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register User
exports.registerUser = catchAsyncErr( async (req,res,next) => {
    const { name, email, password, phone, contingent } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        phone,
        contingent
    });

    sendToken(user,201,res);
});

// Login User
exports.loginUser = catchAsyncErr( async (req,res,next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400))
    };

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user,200,res);

});

// Logout User
exports.logoutUser = catchAsyncErr( async (req,res,next) => {
    
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
});

// Forget Password
exports.forgetPassword = catchAsyncErr( async (req,res,next) => {
    const user = await User.findOne({email:req.body.email});

    if(!user) {
        return next(new ErrorHandler("User not Found", 404))
    }

    // get Reset Token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password Reset Token is :- \n\n ${resetPasswordURL} \n\n if you have not requested this email then please ignore this.`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });
        
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))
    }

});

// Reset Password
exports.resetPassword = catchAsyncErr( async (req,res,next) => {

    // create token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);

});

// Get User Details
exports.getUserDetails = catchAsyncErr( async (req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

});

// Update User Password
exports.updateUserPassword = catchAsyncErr( async (req,res,next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword;
    user.save();

    sendToken(user,200,res)

});

// Update User Details
exports.updateUserDetails = catchAsyncErr( async (req,res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    });

});

// Get All Users -Admin
exports.getAllUsers = catchAsyncErr( async (req,res,next) => {
    
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });

});

// Get single Users -Admin
exports.getSingleUsers = catchAsyncErr( async (req,res,next) => {
    
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler("User does not exist",400))
    }

    res.status(200).json({
        success: true,
        user
    });

});

// Update User Role -Admin
exports.updateUserRole = catchAsyncErr( async (req,res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    });

});

// Delete User -Admin
exports.deleteUser = catchAsyncErr( async (req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler("User does not exist",400))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });

});

