
import { Link } from "react-router-dom";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="border-t border-border border-gray-50 py-8 flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
      <div className="text-gray-50">
        &copy; {currentYear} Driplare. All rights reserved.
      </div>
      <ul className="flex gap-5 justify-center items-center">
        <li>
          <Link
            to="/privacy"
            className="text-gray-50 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            to="/terms"
            className="text-gray-50 hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
        </li>
        <li>
          <Link
            to="/cookies"
            className="text-gray-50 hover:text-primary transition-colors"
          >
            Cookie Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
