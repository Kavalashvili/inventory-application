const express = require("express");
const router = express.Router();

// Require controller modules.
const watch_controller = require('../controllers/watchController');
const brand_controller = require('../controllers/brandController');
const category_controller = require('../controllers/categoryController');

/// WATCHES ROUTES ///

// GET catalog home page.
router.get("/", watch_controller.index);

// GET request for creating a Watch. NOTE This must come before routes that display Watch (uses id).
router.get("/watch/create", watch_controller.watch_create_get);

// POST request for creating Watch.
router.post("/watch/create", watch_controller.watch_create_post);

// GET request to delete Watch.
router.get("/watch/:id/delete", watch_controller.watch_delete_get);

// POST request to delete Watch.
router.post("/watch/:id/delete", watch_controller.watch_delete_post);

// GET request to update Watch.
router.get("/watch/:id/update", watch_controller.watch_update_get);

// POST request to update Watch.
router.post("/watch/:id/update", watch_controller.watch_update_post);

// GET request for one Watch.
router.get("/watch/:id", watch_controller.watch_detail);

// GET request for list of all Watch items.
router.get("/watches", watch_controller.watch_list);

/// BRAND ROUTES ///

// GET request for creating Brand. NOTE This must come before route for id (i.e. display brand).
router.get("/brand/create", brand_controller.brand_create_get);

// POST request for creating Brand.
router.post("/brand/create", brand_controller.brand_create_post);

// GET request to delete Brand.
router.get("/brand/:id/delete", brand_controller.brand_delete_get);

// POST request to delete Brand.
router.post("/brand/:id/delete", brand_controller.brand_delete_post);

// GET request to update Brand.
router.get("/brand/:id/update", brand_controller.brand_update_get);

// POST request to update Brand.
router.post("/brand/:id/update", brand_controller.brand_update_post);

// GET request for one Brand.
router.get("/brand/:id", brand_controller.brand_detail);

// GET request for list of all Brands.
router.get("/brands", brand_controller.brand_list);

/// CATEGORY ROUTES ///

// GET request for creating a Category. NOTE This must come before route that displays Categories (uses id).
router.get("/category/create", category_controller.category_create_get);

//POST request for creating Category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete Category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete Category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update Category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update Category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Category.
router.get("/categories", category_controller.category_list);


module.exports = router;
