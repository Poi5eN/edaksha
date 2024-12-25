import React from "react";

const PrivacyPolicy = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="text-gray-800">
        <p className="mb-6">
          Welcome to eShikshaMitra, where we prioritize the security and privacy
          of your information. This Privacy Policy explains how we collect, use,
          and protect your data.
        </p>
        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We gather both personal and non-personal information essential for the
          functionality of eShikshaMitra. This includes, but is not limited to:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>Student and staff details</li>
          <li>Academic records</li>
          <li>Attendance information</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          The collected information is utilized to provide, maintain, and
          enhance eShikshaMitra services. This includes:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>Managing student records</li>
          <li>Generating academic reports</li>
          <li>Effective communication with users</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">3. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding our Privacy Policy,
          please contact us at
          {/* Email here   */}
          <span className="text-blue-500 cursor-pointer ">
            <a href="mailto:support@eshikshamitra.in"> Send EMail</a>
          </span>
        </p>
        <p className="text-sm text-gray-600">Last updated: {formattedDate}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
