#! /usr/bin/env node

console.log(
    'This script populates some brands, watches and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Watch = require("./models/watch");
  const Brand = require("./models/brand");
  const Category = require("./models/category");
  
  const brands = [];
  const watches = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createBrands();
    await createCategories();
    await createWatches();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(name) {
    const category = new Category({ name: name });
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
  }
  
  async function brandCreate(brand_name, founded) {
    const branddetail = { brand_name: brand_name, founded: founded };
  
    const brand = new Brand(branddetail);
  
    await brand.save();
    brands.push(brand);
    console.log(`Added brand: ${brand_name}`);
  }
  
  async function watchCreate(name, brand, category, year, reference, price) {
    const watchdetail = {
      name: name,
      brand: brand,
      category: category,
      year: year,
      reference: reference,
      price: price,
    };
  
    const watch = new Watch(watchdetail);
    await watch.save();
    watches.push(watch);
    console.log(`Added watch: ${name}`);
  }
  
  async function createBrands() {
    console.log("Adding brands");
    await Promise.all([
      brandCreate("Rolex", '1905'),
      brandCreate("Omega", '1848'),
      brandCreate("Audemars Piguet", '1875'),
      brandCreate("Patek Philippe", '1839'),
      brandCreate("A. Lange & Söhne", '1845'),
    ]);
  }

  async function createCategories() {
    console.log('Adding categories');
    await Promise.all([
      categoryCreate('Diver'),
      categoryCreate('Chronograph'),
      categoryCreate('GMT'),
      categoryCreate('Sport'),
      categoryCreate('Digital Mechanical'),
      categoryCreate('Moonphase'),
      categoryCreate('Dress Watch'),
    ]);
  }

  async function createWatches() {
    console.log('Adding watches');
    await Promise.all([
      watchCreate(
        'Submariner',
        brands[0],
        categories[0],
        '1953',
        '126610LN',
        '$10,250',
      ),
      watchCreate(
        'Daytona',
        brands[0],
        categories[1],
        '1963',
        '126500LN',
        '$15,100',
      ),
      watchCreate(
        'GMT Master II',
        brands[0],
        categories[2],
        '1989',
        '126710BLRO',
        '$10,700',
      ),
      watchCreate(
        'Explorer 40',
        brands[0],
        categories[3],
        '1953',
        '224270',
        '$7,700',
      ),
      watchCreate(
        'Speedmaster Moonwatch Professional',
        brands[1],
        categories[1],
        '1957',
        '310.30.42.50.01.001',
        '$6,300',
      ),
      watchCreate(
        'Seamaster 300m',
        brands[1],
        categories[1],
        '1948',
        '210.30.42.20.01.001',
        '$5,400',
      ),
      watchCreate(
        'Seamaster Railmaster',
        brands[1],
        categories[1],
        '1957',
        '220.10.40.20.01.001',
        '$5,200',
      ),
      watchCreate(
        'Royal Oak',
        brands[2],
        categories[3],
        '1972',
        '16202ST',
        '$35,000',
      ),
      watchCreate(
        'Nautilus',
        brands[3],
        categories[3],
        '1976',
        '5711/1A-010',
        '$34,800',
      ),
      watchCreate(
        'Perpetual Calendar Chronograph',
        brands[3],
        categories[1],
        '1941',
        '5970G-001',
        '86,350',
      ),
      watchCreate(
        'Zeitwerk',
        brands[4],
        categories[4],
        '2009',
        '140.029',
        '$89,050',
      ),
      watchCreate(
        'Saxonia',
        brands[4],
        categories[6],
        '1994',
        '211.032',
        '$24,470',
      ),
      watchCreate(
        'Saxonia Moonphase',
        brands[4],
        categories[5],
        '2016',
        '384.026',
        '$40,100',
      ),
      watchCreate(
        'Lange 1',
        brands[4],
        categories[5],
        '1994',
        '109.021',
        '$29,500',
      ),
    ]);
  }
