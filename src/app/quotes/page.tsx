'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

const QuotesPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    policyType: string;
    amount: number;
    name: string;
    email: string;
  }>({
    policyType: '',
    amount: 0,
    name: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value, // Convert amount to a number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error message
    setLoading(true); // Start loading state

    // Check if formData has valid values
    if (!formData.policyType || formData.amount <= 0) {
      setError('Please select a policy type and provide a valid coverage amount.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send current formData
      });

      if (!response.ok) {
        const errorData = await response.json(); // Retrieve error data if available
        throw new Error(errorData.message || 'Failed to send quote request');
      }

      setSubmitted(true);
      setFormData({ policyType: '', amount: 0, name: '', email: '' }); // Reset form data
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'There was an error submitting your request. Please try again later.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <Layout>
      <Head>
        <title>Get a Quote - Insurance Company</title>
        <meta name="description" content="Get a free quote for life insurance and related services." />
      </Head>

      <h1 className="text-2xl font-bold mb-4">Get a Quote</h1>

      {submitted ? (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Quote Details</h2>
          <p><strong>Policy Type:</strong> {formData.policyType}</p>
          <p><strong>Coverage Amount:</strong> ${formData.amount}</p>
          <p><strong>Contact Email:</strong> {formData.email}</p>
          <p className="text-green-600">Thank you! Your quote request has been submitted.</p>
        </div>
      ) : (
        <>
          {error && <p className="text-red-600">{error}</p>}
          <p className="mb-4">Fill out the form below to receive a free quote.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block">Your Name:</label>
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
              <label htmlFor="email" className="block">Your Email:</label>
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
              <label htmlFor="policyType" className="block">Policy Type:</label>
              <select
                id="policyType"
                name="policyType"
                className="border p-2 w-full"
                value={formData.policyType}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block">Coverage Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="border p-2 w-full"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2" disabled={loading}>
              {loading ? 'Sending...' : 'Get Quote'}
            </button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default QuotesPage;
