const Category = require('../models/category');
const Watch = require('../models/watch');
const { body, validationResult } = require("express-validator");
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

  
// Display Category create form on GET.
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

  
// Handle Category create on POST.
exports.category_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Category object with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      const categoryExists = await Category.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        // Category exists, redirect to its detail page.
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        // New category saved. Redirect to brand detail page.
        res.redirect(category.url);
      }
    }
  }),
];

  
// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of Cctegory and all their watches (in parallel)
  const [category, allWatchesByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Watch.find({ category: req.params.id }, "name").exec(),
  ]);

  if (Category === null) {
    // No results.
    res.redirect("/catalog/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    category_watches: allWatchesByCategory,
  });
});
  
// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of category and all their watches (in parallel)
  const [category, allWatchesByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Watch.find({ category: req.params.id }, "name").exec(),
  ]);

  if (allWatchesByCategory.length > 0) {
    // Category has watches. Render in same way as for GET route.
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      category_watches: allWatchesByCategory,
    });
    return;
  } else {
    // Category has no watches. Delete object and redirect to the list of brands.
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect("/catalog/categories");
  }
});
  
  // Display category update form on GET.
  exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update GET");
  });
  
  // Handle category update on POST.
  exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update POST");
  });