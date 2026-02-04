const Contact = require('../models/Contact');
const { send_email } = require('../middleware/SendEmail');
const PDFDocument = require('pdfkit');

exports.createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
      page,
      ipv4,
      ipv6
    } = req.body;



    // Create and save contact
    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message,
      page,
      ipv4,
      ipv6
    });

    await contact.save();

    // Prepare email content
    const subject = "New Contact Form Submission";
    const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: auto;">
      <div style="background-color: #007bff; padding: 20px; color: white; text-align: center;">
        <h2 style="margin: 0;">🚀 New Contact Request</h2>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 10px;">${name}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px;">${phone}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-weight: bold;">Service:</td>
            <td style="padding: 10px;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Message:</td>
            <td style="padding: 10px;">${message}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-weight: bold;">Page:</td>
            <td style="padding: 10px;">${page}</td>
          </tr>
           <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-weight: bold;">IP v4:</td>
            <td style="padding: 10px;">${ipv4}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-weight: bold;">IP v6:</td>
            <td style="padding: 10px;">${ipv6}</td>
          </tr>
        </table>
        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          This message was generated from your website contact form.
        </p>
      </div>
    </div>
  </div>
`;



    const recipients = [
      "rohit@franticpro.com",
      "yash@franticpro.com",
      "harpreetfrantic@gmail.com"

    ];

    await send_email(recipients, subject, htmlContent);
    return res.status(201).json({ message: "Your message has been received. We'll contact you soon!", error: 0 });

  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later.", error: 1 });
  }
};






exports.getContactsByDatePDF = async (req, res) => {
  try {
    const { startDate, endDate, download } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Please provide startDate and endDate in ISO format.", error: 1 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const contacts = await Contact.find({
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });

    if (download === "true") {
      // Generate PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=contacts_${startDate}_to_${endDate}.pdf`);

      doc.pipe(res);

      doc.fontSize(18).text(`Contacts from ${startDate} to ${endDate}`, { align: 'center' });
      doc.moveDown();

      contacts.forEach((contact, index) => {
        doc.fontSize(12)
          .text(`S.No: ${index + 1}`)
          .text(`Name: ${contact.name}`)
          .text(`Email: ${contact.email}`)
          .text(`Phone: ${contact.phone}`)
          .text(`Service: ${contact.service}`)
          .text(`Message: ${contact.message}`)
          .text(`Page: ${contact.page}`)
          .text(`Created At: ${contact.createdAt.toISOString()}`)
          .moveDown();
      });

      doc.end();
    } else {
      // Return JSON if download not requested
      res.status(200).json({ data: contacts, error: 0 });
    }

  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later.", error: 1 });
  }
};
