const Event = require('../models/eventModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErr = require('../middleWare/catchAsyncErrors');
const cloudinary = require("cloudinary");

exports.createEvent = catchAsyncErr( async (req,res,next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  
  const { name, date, time, participants } = req.body;
  const event = await Event.create({
    name,
    date,
    time,
    participants,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    event
  });

});

exports.getEventDetails = catchAsyncErr( async (req,res,next) => {

  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHander("Event not found", 404));
  }

  res.status(200).json({
    success: true,
    event,
  });

});

exports.updateEventDetails = catchAsyncErr( async (req,res,next) => {

  const newEventData = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      rules: req.body.rules,
      participants: req.body.participants
  }

  const event = await Event.findByIdAndUpdate(req.user.id, newEventData,{
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true,
  });

});

exports.getAllEvents = catchAsyncErr( async (req,res,next) => {
    
  const events = await Event.find();

  res.status(200).json({
      success: true,
      events
  });

});

exports.getAdminEvents = catchAsyncErr(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    success: true,
    events,
  });
});

exports.getSingleEvent = catchAsyncErr( async (req,res,next) => {
    
  const event = await Event.findById(req.params.id);

  if(!event) {
      return next(new ErrorHandler("Event does not exist",400))
  }

  res.status(200).json({
      success: true,
      event
  });

});

exports.deleteEvent = catchAsyncErr( async (req,res,next) => {

  const event = await Event.findById(req.params.id);

  if(!event) {
      return next(new ErrorHandler("Event does not exist",400))
  }

  await event.remove();

  res.status(200).json({
      success: true,
      message: "Event Deleted Successfully"
  });

});