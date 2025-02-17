import "./globals.css";
import "./typekit.css";
import Navbar from "./components/Navbar";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

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

        <footer className="bg-white text-center py-8 flex flex-col md:flex-row justify-between px-12 gap-y-12">
          <p className="text-gray-600 italic">
            © {new Date().getFullYear()} curingwithCARE - A 501(c)(3) Nonprofit
          </p>

          <div className="flex gap-12">
            <div className="flex flex-col text-right">
              <a href="/about" className="text-gray-600 hover:text-gray-800">Past Events</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800">Branches</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800">Team</a>
            </div>

            <div className="flex flex-col text-right">
              <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800" target="_blank">Instagram</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800" target="_blank">LinkedIn</a>
              <a href="/about" className="text-gray-600 hover:text-gray-800" target="_blank">Facebook</a>
              <a href="mailto:curingwithcare@gmail.com" className="text-gray-600 hover:text-gray-800">curingwithcare@gmail.com</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
