const mongoose = require('mongoose');

const { Schema } = mongoose;
const itemSchema = new Schema({
    item: {
        type: Boolean,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
    duration: {
        type: Number,
        default: 0,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});
// model()의 세번째 인자는 사용자가 지정할 수 있는 컬렉션 이름
module.exports = mongoose.model('Item', itemSchema);