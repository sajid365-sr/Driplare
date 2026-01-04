import React from "react";

interface NewsletterConfirmationEmailProps {
  name: string;
}

export const NewsletterConfirmationEmail: React.FC<
  NewsletterConfirmationEmailProps
> = ({ name }) => {
  return (
    <div className="font-family-mono max-w-600 mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2 text-center rounded-t-lg">
        <h1 className="text-orange-500 m-0">Driplare Newsletter</h1>
      </div>

      <div className="px-6 py-4 bg-gray-100 text-gray-800">
        <h2 className="text-lg font-semibold">
          Welcome to Our Community, {name}!
        </h2>
        <p>Thank you for subscribing to the Driplare newsletter.</p>
        <p>You'll now receive our latest updates on:</p>

        <ul className="pl-5">
          <li>AI and web development trends</li>
          <li>Digital marketing insights</li>
          <li>Case studies and success stories</li>
          <li>Exclusive tips and tutorials</li>
        </ul>

        <p>We're excited to share our knowledge with you!</p>

        <div className="mt-7.5 bg-orange-500 px-4 py-2 text-center rounded">
          <a
            href="https://driplare.com/insights"
            className="text-white no-underline font-bold"
          >
            CHECK OUT OUR LATEST INSIGHTS
          </a>
        </div>

        <p className="mt-7.5 text-sm text-gray-600">
          If you didn't subscribe to our newsletter, please disregard this
          email.
        </p>
      </div>

      <div className="bg-gray-800 text-white px-4 py-2 text-center rounded-b-lg">
        <p className="m-0 text-sm">
          © {new Date().getFullYear()} Driplare. All rights reserved.
        </p>
      </div>
    </div>
  );
};
