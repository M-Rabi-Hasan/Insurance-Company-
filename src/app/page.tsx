// src/app/page.tsx
import Layout from '@/components/Layout';
import Head from 'next/head';
import OnlineQuote from '@/components/OnlineQuote';
import Testimonials from '@/components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Insurance Company - Home</title>
        <meta name="description" content="Welcome to our insurance company. We specialize in life insurance and related services." />
        <meta name="keywords" content="life insurance, insurance quotes, insurance services" />
        <meta property="og:title" content="Insurance Company - Home" />
        <meta property="og:description" content="Get the best life insurance coverage with our expert services." />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Welcome to Our Insurance Company</h1>
        <p className="mb-4">
          We provide a range of life insurance options to meet your needs. Get started today by requesting a quote or exploring our services.
        </p>
        <OnlineQuote />
        <Testimonials />
        {/* Do not include ContactPage here */}
      </main>
    </Layout>
  );
};

export default HomePage;
