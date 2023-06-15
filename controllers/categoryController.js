const Category = require('../models/category');
const Watch = require('../models/watch');
const asyncHandler = require("express-async-handler");

// Display list of all category.
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).exec();
    res.render("category_list", {
      title: "Category List",
      category_list: allCategories,
    });
  });
  
// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of category and all associated watches (in parallel)
  const [category, watchesInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Watch.find({ category: req.params.id }, "name year reference price").exec(),
  ]);
  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    category_watches: watchesInCategory,
  });
});

  
  // Display category create form on GET.
  exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category create GET");
  });
  
  // Handle category create on POST.
  exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category create POST");
  });
  
  // Display category delete form on GET.
  exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete GET");
  });
  
  // Handle category delete on POST.
  exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete POST");
  });
  
  // Display category update form on GET.
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update GET");
  });
  
  // Handle category update on POST.
  exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update POST");
  });