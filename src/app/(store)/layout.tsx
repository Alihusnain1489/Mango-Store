import { Toaster } from 'sonner';
import Navbar from '@/components/store/Navbar';
import CartDrawer from '@/components/store/CartDrawer';
import Footer from '@/components/store/footer';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--green)',
            color: '#fff',
            border: 'none',
            fontFamily: 'var(--font-body)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 13,
          },
        }}
      />
    </>
  );
}