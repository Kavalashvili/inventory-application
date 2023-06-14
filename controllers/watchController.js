const Watch = require('../models/watch');
const asyncHandler = require("express-async-handler");

  exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
  });
  
  // Display list of all watchs.
  exports.watch_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch list");
  });
  
  // Display detail page for a specific watch.
  exports.watch_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: watch detail: ${req.params.id}`);
  });
  
  // Display watch create form on GET.
  exports.watch_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch create GET");
  });
  
  // Handle watch create on POST.
  exports.watch_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch create POST");
  });
  
  // Display watch delete form on GET.
  exports.watch_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch delete GET");
  });
  
  // Handle watch delete on POST.
  exports.watch_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch delete POST");
  });
  
  // Display watch update form on GET.
  exports.watch_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch update GET");
  });
  
  // Handle watch update on POST.
  exports.watch_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: watch update POST");
  });