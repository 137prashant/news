import "./globals.css";
import SessionWrapper from "./component/SessionWrapper";
export const metadata = {
  title: "News App",
  description: "Authentication Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body suppressHydrationWarning>
        <SessionWrapper>
        
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}