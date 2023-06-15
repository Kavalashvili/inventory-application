const Brand = require('../models/brand');
const Watch = require('../models/watch');
const asyncHandler = require("express-async-handler");

// Display list of all brands.
exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ brand_name: 1 }).exec();
  res.render("brand_list", {
    title: "Brand List",
    brand_list: allBrands,
  });
});

  
// Display detail page for a specific Brand.
exports.brand_detail = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their watches (in parallel)
  const [brand, allWatchesByAuthor] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Watch.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brand === null) {
    // No results.
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_detail", {
    title: "Brand Detail",
    brand: brand,
    brand_watches : allWatchesByAuthor,
  });
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
  