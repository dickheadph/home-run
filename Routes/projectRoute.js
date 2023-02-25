const express = require('express');
const router = express();
const projectRoute = require('../Controller/projectControler');
const { getAll, getSingleProject, addProject, editProject, deleteProject } =
  projectRoute;
const uploadImage = require('../Utility/imageProcess');

router.route('/').get(getAll).post(uploadImage, addProject);
router
  .route('/:id')
  .get(getSingleProject)
  .patch(editProject)
  .delete(deleteProject);

module.exports = router;
