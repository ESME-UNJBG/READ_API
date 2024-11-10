const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TraksScheme = new mongoose.Schema(
  {
    name: { type: String },
    album: { type: String },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
      },
      message: "error_url",
    },
    artist: {
      name: { type: String },
      nickname: { type: String },
      natioanlity: { type: String },
    },
    duration: { start: { type: Number }, end: { type: Number } },
    mediaId: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);
//implementar metood propio con relacoin a storage
TraksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages", //pasamos a storage
        localField: "mediaId", //media Id
        foreignField: "_id", //relacion a storage_ID
        as: "audio", //alias audio
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TraksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(id),
      },
    },
    {
      $lookup: {
        from: "storages", //pasamos a storage
        localField: "mediaId", //media Id
        foreignField: "_id", //relacion a storage_ID
        as: "audio", //alias audio
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TraksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("traks", TraksScheme);
