import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// Define the structure of the client data
interface ClientDetailsData {
  name: string;
  company: string;
  contact: number | string; // Allow string for input value, convert to number on submit
  email: string;
  address: string;
}

// Define the props for the ClientDetails form component
interface ClientDetailsFormProps {
  initialClientData?: ClientDetailsData; // Optional initial data for editing
  onSubmit: (clientData: ClientDetailsData) => void; // Callback for form submission
  onReset?: () => void; // Optional callback for reset, parent can react if needed
}

const ClientDetails: React.FC<ClientDetailsFormProps> = ({
  initialClientData,
  onSubmit,
  onReset,
}) => {
  // Initialize state with either provided initial data or empty defaults
  const [client, setClient] = useState<ClientDetailsData>(
    initialClientData || {
      name: '',
      company: '',
      contact: '', // Initialize as empty string for input field
      email: '',
      address: '',
    }
  );

  // Handle input changes, converting 'contact' to a number
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: name === "contact" ? (value === "" ? "" : Number(value)) : value, // Keep empty string for number if cleared
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ensure contact is a number before submitting, or handle validation
    const submittedClientData: ClientDetailsData = {
      ...client,
      contact: typeof client.contact === 'string' && client.contact !== '' ? Number(client.contact) : (client.contact as number)
    };
    onSubmit(submittedClientData);
  };

  // Handle form reset: Clears the form fields
  const handleReset = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClient({
      name: '',
      company: '',
      contact: '', // Reset to empty string
      email: '',
      address: '',
    });
    if (onReset) {
      onReset(); // Call parent's onReset if provided
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8 border border-gray-200 font-inter">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center col-span-full">
        Client Details Form
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company Input */}
        <div>
          <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={client.company}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Contact Input */}
        <div>
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={client.contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address Input (Spans both columns) */}
        <div className="md:col-span-2"> {/* This div will span both columns on medium screens and up */}
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={client.address}
            onChange={handleChange}
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 resize-y"
            required
          ></textarea>
        </div>

        {/* Buttons (Spans both columns and aligns to end) */}
        <div className="flex items-center justify-end space-x-4 md:col-span-2 mt-4">
          <button
            type="reset"
            onClick={handleReset}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300 transition duration-150 ease-in-out"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientDetails;
