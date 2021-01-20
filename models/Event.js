const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Event', EventSchema);
