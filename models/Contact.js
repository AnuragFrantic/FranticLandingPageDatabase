const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    service: {
        type: String,
        required: true,
        // enum: ['Web', 'App', 'Design']
    },
    message: {
        type: String,
        required: true
    },

    page: {
        type: String, // e.g., 'homepage', 'landingpage', 'service/web', etc.
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
