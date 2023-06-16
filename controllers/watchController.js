const Watch = require("../models/watch");
const Brand = require("../models/brand");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

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
  // Get all brands and categories, which we can use for adding to our watch.
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().exec(),
    Category.find().exec(),
  ]);

  res.render("watch_form", {
    title: "Create Watch",
    brands: allBrands,
    categories: allCategories,
  });
});

  
// Handle watch create on POST.
exports.watch_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("year", "Year must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("reference", "Reference must not be empty").trim().isLength({ min: 1 }).escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  body("category.*").escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Watch object with escaped and trimmed data.
    const watch = new Watch({
      name: req.body.name,
      brand: req.body.brand,
      year: req.body.year,
      reference: req.body.reference,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all brands and categories for form.
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      // Mark our selected categories as checked.
      for (const categories of allCategories) {
        if (watch.category.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("watch_form", {
        title: "Create Watch",
        brands: allBrands,
        categories: allCategories,
        watch: watch,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save watch.
      await watch.save();
      res.redirect(watch.url);
    }
  }),
];

  
// Display Watch delete form on GET.
exports.watch_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of watch
  const [watch] = await Promise.all([
    Watch.findById(req.params.id).exec(),
  ]);

  if (Watch === null) {
    // No results.
    res.redirect("/catalog/watches");
  }

  res.render("watch_delete", {
    title: "Delete Watch",
    watch: watch,
  });
});

  
// Handle Watch delete on POST.
exports.watch_delete_post = asyncHandler(async (req, res, next) => {
  await Watch.findByIdAndRemove(req.body.watchid);
  res.redirect("/catalog/watches");
  }
);
  
// Display watch update form on GET.
exports.watch_update_get = asyncHandler(async (req, res, next) => {
  // Get watch, brand and category for form.
  const [watch, allBrands, allCategories] = await Promise.all([
    Watch.findById(req.params.id).populate("brand").populate("category").exec(),
    Brand.find().exec(),
    Category.find().exec(),
  ]);

  if (watch === null) {
    // No results.
    const err = new Error("Watch not found");
    err.status = 404;
    return next(err);
  }

  res.render("watch_form", {
    title: "Update Watch",
    brands: allBrands,
    categories: allCategories,
    watch: watch,
  });
});

  
// Handle watch update on POST.
exports.watch_update_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") {
        req.body.category = [];
      } else {
        req.body.category = new Array(req.body.category);
      }
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("year", "Year must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("reference", "Reference must not be empty").trim().isLength({ min: 1 }).escape(),
  body("category.*").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Watch object with escaped/trimmed data and old id.
    const watch = new Watch({
      name: req.body.name,
      brand: req.body.brand,
      year: req.body.year,
      reference: req.body.reference,
      category: typeof req.body.category === "undefined" ? [] : req.body.category,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all brands and categories for form
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      res.render("watch_form", {
        name: "Update Watch",
        brands: allBrands,
        categories: allCategories,
        watch: watch,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const thewatch = await Watch.findByIdAndUpdate(req.params.id, watch, {});
      // Redirect to watch detail page.
      res.redirect(thewatch.url);
    }
  }),
];
