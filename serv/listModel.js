const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    list: [{
        idx: Number,
        content: String,
        checked: Boolean
    }],
    user_id: {
        type: ObjectId,
        required: true
    }

});