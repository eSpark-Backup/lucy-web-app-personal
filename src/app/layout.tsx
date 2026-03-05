import ThemeToggle from "./components/global/ThemeToggle";
import TanstackProvider from "./providers/TanstackProvider";
import ThemeContextProvider from "./context/ThemeContext";
import { Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "add title for meta!",
  description: "add description for meta!",
};

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ThemeContextProvider>
          <TanstackProvider>
            {/* <ThemeToggle /> */}
            {children}
          </TanstackProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
