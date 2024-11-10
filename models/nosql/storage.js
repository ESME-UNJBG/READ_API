const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const StorageSheme = new mongoose.Schema(
  {
    url: { type: String },
    filename: { type: String },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);
StorageSheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storages", StorageSheme);
