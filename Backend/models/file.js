const mongoose = require("mongoose");


const fileMetatdataSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      },
      uploader :{
        type : String,
        required:true,
      }
})


const FileMetadata = mongoose.model("FileMetadata",fileMetatdataSchema);


module.exports = FileMetadata;
