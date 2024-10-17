'use client'

// src/components/OnlineQuote.tsx
import React, { useState } from 'react';

const OnlineQuote: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [quote, setQuote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can add logic to calculate the quote
    const calculatedQuote = parseInt(coverageAmount) / 1000; // Simplified quote calculation
    setQuote(`Estimated monthly premium for ${name}: $${calculatedQuote.toFixed(2)}`);
  };

  return (
    <section className="bg-gray-100 p-4 md:p-6 my-6 rounded-lg shadow">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Get an Online Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="coverage">Coverage Amount ($)</label>
          <input
            type="number"
            id="coverage"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Get Quote
        </button>
      </form>
      {quote && <p className="mt-4 text-lg font-semibold">{quote}</p>}
    </section>
  );
};

export default OnlineQuote;
