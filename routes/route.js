const express = require('express');
const { createContact } = require('../Controller/Contact');


const router = express.Router();


router.post('/contact', createContact)




module.exports = router;