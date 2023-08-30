const mongoose = require("mongoose");

const fileMetatdataSchema = new mongoose.Schema({
  originalname: {
    type: String,
  },
  mimetype: {
    type: String,
  },

  uploadDate: {
    type: Date,
    default: Date.now,
  },
  uploader: {
    type: String,
  },
  size : {
    type: Number,

  },
  path : {
    type : String,
    
  },
  fileuuid : {
      type : String,

  }


});

const FileMetadata = mongoose.model("FileMetadata", fileMetatdataSchema);

module.exports = FileMetadata;
