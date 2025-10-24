const express = require('express');
const { createContact, getContactsByDatePDF } = require('../Controller/Contact');


const router = express.Router();


router.post('/contact', createContact)
router.get('/contact', getContactsByDatePDF)





module.exports = router;