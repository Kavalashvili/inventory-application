const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WatchSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  year: { type: String, required: true },
  reference: { type: String, required: true },
  price: { type: String, required: true },
});

// Virtual for watch's URL
WatchSchema.virtual("url").get(function () {
  return `/catalog/watch/${this._id}`;
});

// Export model
module.exports = mongoose.model("Watch", WatchSchema);
