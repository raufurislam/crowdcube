import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-6">
      <div className="max-w-screen-xl lg:px-2 mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo and About */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Crowdcube</h1>
            <p className="text-sm mt-2">
              Empowering your ideas through community funding.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="hover:text-gray-400" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Crowdcube. All Rights Reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-4 text-sm mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
