// app/layout.tsx (Server Component)
import './globals.css';
import AuthProviderWrapper from '../components/AuthProviderWrapper';

export const metadata = {
  title: 'My Next App',
  description: 'Login + Dashboard App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  );
}
