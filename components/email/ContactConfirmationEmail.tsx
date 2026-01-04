import React from "react";

interface ContactConfirmationEmailProps {
  name: string;
  message: string;
}

export const ContactConfirmationEmail: React.FC<
  ContactConfirmationEmailProps
> = ({ name, message }) => {
  return (
    <div className="font-family-mono max-w-600 mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2 text-center rounded-t-lg">
        <h1 className="text-orange-500 m-0">Driplare</h1>
      </div>

      <div className="px-6 py-4 bg-gray-100 text-gray-800">
        <h2 className="text-lg font-semibold">
          Thank You For Contacting Us, {name}!
        </h2>
        <p>We have received your message:</p>

        <div className="bg-gray-200 px-4 py-2 rounded border border-gray-300 mb-5 italic">
          "{message}"
        </div>

        <p>
          Our team will review your inquiry and get back to you as soon as
          possible, typically within 24-48 business hours.
        </p>

        <p>
          In the meantime, feel free to explore our services and recent projects
          on our website.
        </p>

        <div className="mt-7.5 bg-orange-500 px-4 py-2 text-center rounded">
          <a
            href="https://driplare.com/portfolio"
            className="text-white no-underline font-bold"
          >
            EXPLORE OUR PORTFOLIO
          </a>
        </div>
      </div>

      <div className="bg-gray-800 text-white px-4 py-2 text-center rounded-b-lg">
        <p className="m-0 text-sm">
          © {new Date().getFullYear()} Driplare. All rights reserved.
        </p>
      </div>
    </div>
  );
};
