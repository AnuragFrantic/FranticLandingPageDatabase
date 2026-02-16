const express = require('express');
const { createContact, getContactsByDatePDF } = require('../Controller/Contact');
const { createGoogleAdsLead, getGoogleAdsLeadByDatePDF } = require('../Controller/GoogleAds');
const { createAiLeads, getAiLeadsByDatePDF } = require('../Controller/AiController');


const router = express.Router();


router.post('/contact', createContact)
router.get('/contact', getContactsByDatePDF)


router.post('/google-ads', createGoogleAdsLead)
router.get('/google-ads', getGoogleAdsLeadByDatePDF)


router.post('/ai-leads', createAiLeads)
router.get('/ai-leads', getAiLeadsByDatePDF)





module.exports = router;