// src/components/Testimonials.tsx
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    feedback: 'I had a great experience with this insurance company. They helped me every step of the way.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    feedback: 'Fantastic service and great rates. Highly recommend!',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    feedback: 'Professional and attentive. I feel secure knowing I have the right coverage.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="my-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">What Our Clients Say</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-gray-700">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
