const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    casenumber: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    summary: {
        type: String
    },
    holding: {
        type: String
    },
    department: {
        type: Number,
        default: 1
    },
    jmreference: {
        type: String
    },
    prreference: {
        type: String
    },
    datanumber: {
        type: Number,
        maxlength: 50
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

caseSchema.index({ //datanumber는 임의로 추가함.
    title:'text',
    description: 'text',
    datanumber: 'text'
}, {
    weights: {
        name: 5,
        description: 1,
        datanumber: 5
    }
})

const Case = mongoose.model('Case', caseSchema);
module.exports = { Case }

