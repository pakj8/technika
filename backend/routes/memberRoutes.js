const express = require('express');
const { addMember, removeMember, getAllMembers } = require('../controllers/memberController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleWare/auth');

router.route("/member")
      .get(isAuthenticatedUser, getAllMembers)
      .post(isAuthenticatedUser, addMember)
      .delete(isAuthenticatedUser, removeMember);

module.exports = router;