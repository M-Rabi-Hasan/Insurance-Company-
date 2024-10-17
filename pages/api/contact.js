// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create the email content
    const emailContent = `
      New Contact Form Submission:
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Replace with your SMTP server
      port: 587,
      secure: false, // Use true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Replace with your email
        pass: process.env.SMTP_PASS, // Replace with your email password
      },
    });

    try {
      await transporter.sendMail({
        from: email, // Use the email from the form
        to: process.env.SMTP_USER, // Change to your recipient address
        subject: `New Contact Form Submission: ${subject}`,
        text: emailContent,
      });

      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
