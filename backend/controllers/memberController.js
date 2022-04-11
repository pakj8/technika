const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErr = require('../middleWare/catchAsyncErrors');
const Member = require('../models/memberModel');
const User = require('../models/userModels');

exports.addMember = catchAsyncErr( async (req,res,next) => {
  const { name, email, phone } = req.body;

  const member = req.user.team.length > 0 && req.user.team.find(mem => mem.email === email)

  if (!member) {
    const newMember = await Member({
      name,
      email,
      phone
    });

    const user = await User.findOneAndUpdate(
      {_id: req.user._id},
      {
        $push: {
          team: newMember
        }
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    )
    

    res.status(200).json({
      success: true,
      user
    })

  } else {
    return next(new ErrorHandler('Member already exist',401))
  }
  
});

exports.removeMember = catchAsyncErr( async (req,res,next) => {
  const {email} = req.body;
  console.log(req.body);
  const member = req.user.team.length > 0 && req.user.team.find(mem => mem.email === email)

  if(!member) {
      return next(new ErrorHandler("Member does not exist",400))
  }

  const updatedUser = await User.findByIdAndUpdate(
    {_id: req.user.id},
    {
      $pull: {
        team: member
      }
    },
    {
      new: true,
    }
  )
  res.status(200).json({
      success: true,
      message: "Member Deleted Successfully",
      user: updatedUser
  });
});

exports.getAllMembers = catchAsyncErr( async (req,res,next) => {
    
  const user = await User.findById(req.user._id);
  const team = user.team

  res.status(200).json({
      success: true,
      team
  });
});