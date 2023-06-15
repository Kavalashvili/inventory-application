const Watch = require("../models/watch");
const Brand = require("../models/brand");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of watches, brands and category counts (in parallel)
  const [
    numWatches,
    numBrands,
    numCategories,
  ] = await Promise.all([
    Watch.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Watch Collection Home",
    watch_count: numWatches,
    brand_count: numBrands,
    category_count: numCategories,
  });
});

  
  // Display list of all watchs.
exports.watch_list = asyncHandler(async (req, res, next) => {
  const allWatches = await Watch.find({}, "name brand")
    .sort({ name: 1 })
    .populate("brand")
    .exec();

  res.render("watch_list", { title: "Watch List", watch_list: allWatches });
});

  
// Display detail page for a specific watch.
exports.watch_detail = asyncHandler(async (req, res, next) => {
  // Get details of watches
  const [watch] = await Promise.all([
    Watch.findById(req.params.id).populate("brand").populate("category").exec(),
  ]);

  if (watch === null) {
    // No results.
    const err = new Error("Watch not found");
    err.status = 404;
    return next(err);
  }

  res.render("watch_detail", {
    title: watch.name,
    watch: watch,
  });
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