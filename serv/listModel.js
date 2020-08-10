const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: String,
    list: [{
        idx: Number,
        content: String,
        isChecked: Boolean
    }],
    user_ID: {
        type: ObjectId,
        required: true
    }

});

const ListModel = mongoose.model('List',ListSchema);

module.exports = ListModel;