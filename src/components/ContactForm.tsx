// src/components/ContactForm.tsx

import { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form after successful submission
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error); // Log error for debugging
      setStatusMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={4}
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Send Message</button>
      {statusMessage && <p className="mt-4">{statusMessage}</p>}
    </form>
  );
};

export default ContactForm;
