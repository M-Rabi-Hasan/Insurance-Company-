// src/components/Layout.tsx
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Insurance Company</h1>
        <nav className="mt-2">
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/quotes" className="mr-4">Get a Quote</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2024 Insurance Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
