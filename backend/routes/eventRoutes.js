const express = require('express');
const { createEvent, getAllEvents, getSingleEvent, updateEventDetails, deleteEvent, getEventDetails, getAdminEvents } = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleWare/auth')

const router = express.Router();

router.route("/events").get(getAllEvents);

router.route("/event/:id").get(getEventDetails);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminEvents);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createEvent);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEventDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEvent);


module.exports = router;