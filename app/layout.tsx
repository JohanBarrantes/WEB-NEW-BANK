import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'My Next App',
  description: 'Login + Dashboard App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
