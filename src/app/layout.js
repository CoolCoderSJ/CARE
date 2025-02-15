import "./globals.css";
import "./typekit.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "curingwithCARE",
  description: "Dedicated to Cancer Awareness, Research and Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`--font-hoss-normal`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
