import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data); // Log the incoming data

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: 'New Quote Request',
      text: `You have received a new quote request:\n\nPolicy Type: ${data.policyType}\nCoverage Amount: $${data.amount}\nContact Email: ${data.email}`,
      html: `<p>You have received a new quote request:</p><ul><li><strong>Policy Type:</strong> ${data.policyType}</li><li><strong>Coverage Amount:</strong> $${data.amount}</li><li><strong>Contact Email:</strong> ${data.email}</li></ul>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Quote request submitted successfully!', data }, { status: 200 });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json({ message: 'Failed to submit quote request. Please try again later.' }, { status: 500 });
  }
}
