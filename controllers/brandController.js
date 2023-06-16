const Brand = require('../models/brand');
const Watch = require('../models/watch');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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
  const [brand, allWatchesByBrand] = await Promise.all([
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
    brand_watches : allWatchesByBrand,
  });
});

  
// Display Brand create form on GET.
exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
};

  
// Handle Brand create on POST.
exports.brand_create_post = [
  // Validate and sanitize the name field.
  body("name", "Brand name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a brand object with escaped and trimmed data.
    const brand = new Brand({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("brand_form", {
        title: "Create Brand",
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Brand with same name already exists.
      const brandExists = await Brand.findOne({ name: req.body.name }).exec();
      if (brandExists) {
        // Brand exists, redirect to its detail page.
        res.redirect(brandExists.url);
      } else {
        await brand.save();
        // New brand saved. Redirect to brand detail page.
        res.redirect(brand.url);
      }
    }
  }),
];

  
// Display Brand delete form on GET.
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their watches (in parallel)
  const [brand, allWatchesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Watch.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brand === null) {
    // No results.
    res.redirect("/catalog/brands");
  }

  res.render("brand_delete", {
    title: "Delete Brand",
    brand: brand,
    brand_watches: allWatchesByBrand,
  });
});

  
// Handle Brand delete on POST.
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of brand and all their watches (in parallel)
  const [brand, allWatchesByBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Watch.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (allWatchesByBrand.length > 0) {
    // Brand has watches. Render in same way as for GET route.
    res.render("brand_delete", {
      title: "Delete Brand",
      brand: brand,
      brand_watches: allWatchesByBrand,
    });
    return;
  } else {
    // Brand has no watches. Delete object and redirect to the list of brands.
    await Brand.findByIdAndRemove(req.body.brandid);
    res.redirect("/catalog/brands");
  }
});

  
// Display Brand update form on GET.
exports.brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();
  if (brand === null) {
    // No results.
    const err = new Error("Brand not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_form", { title: "Update Brand", brand: brand });
});
  
// Handle Brand update on POST.
exports.brand_update_post = [
  // Validate and sanitize fields.
  body("brand_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Brand object with escaped and trimmed data (and the old id!)
    const brand = new Brand({
      brand_name: req.body.brand_name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render("brand_form", {
        title: "Update Brand",
        brand: brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      await Brand.findByIdAndUpdate(req.params.id, brand);
      res.redirect(brand.url);
    }
  }),
];
  