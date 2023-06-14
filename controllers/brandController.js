const Brand = require('../models/brand');
const asyncHandler = require("express-async-handler");

// Display list of all brands.
exports.brand_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand list");
  });
  
  // Display detail page for a specific brand.
  exports.brand_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: brand detail: ${req.params.id}`);
  });
  
  // Display brand create form on GET.
  exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand create GET");
  });
  
  // Handle brand create on POST.
  exports.brand_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand create POST");
  });
  
  // Display brand delete form on GET.
  exports.brand_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand delete GET");
  });
  
  // Handle brand delete on POST.
  exports.brand_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand delete POST");
  });
  
  // Display brand update form on GET.
  exports.brand_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand update GET");
  });
  
  // Handle brand update on POST.
  exports.brand_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand update POST");
  });
  