// src/pages/api/contact.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract the fields from the request body
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Your SMTP host
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER, // Sender's email
      to: process.env.SMTP_USER,     // Replace with your receiving email
      subject: `New Contact Request: ${subject}`, // Use the subject field from the form
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ status: 'Contact request sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send contact request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
