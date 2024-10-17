'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ...
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Validate form data
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    setError('Please fill in all fields.');
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send message');
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error: any) {
    console.error('Error:', error);
    setError(error.message || 'There was an error submitting your request. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  return (
    <Layout>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us for any inquiries." />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      {submitted ? (
        <p className="text-green-600">Message sent successfully!</p>
      ) : (
        <>
          {error && <p className="text-red-600">{error}</p>}
          <p className="mb-4">If you have any questions, feel free to reach out to us.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border p-2 w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border p-2 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="border p-2 w-full"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block">Message:</label>
              <textarea
                id="message"
                name="message"
                className="border p-2 w-full"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default ContactPage;
