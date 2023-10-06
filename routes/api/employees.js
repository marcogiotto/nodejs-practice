const express = require('express');
const { getAllEmployees, createNewEmployee, deleteEmployee, updateEmployee, getEmployee } = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

const router = express.Router();

router.route('/',)
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route('/:id')
    .get(getEmployee);

module.exports = router;