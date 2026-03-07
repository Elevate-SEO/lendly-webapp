import React, { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


interface Product {
  title: string;
  description: string;
  price: number;
  period: string;
  location: string;
  ownerName: string;
  category: string;
  image: string;
}

export default function Add() {
  const [formData, setFormData] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    period: "day",
    location: "",
    ownerName: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add product");

      alert("Product added successfully!");

      setFormData({
        title: "",
        description: "",
        price: 0,
        period: "day",
        location: "",
        ownerName: "",
        category: "",
        image: "",
      });
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Navbar />
    
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-12 mb-20">

      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add New Listing
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Sony PS5 + 2 Controllers"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Add Image
            </label>
            <input
              type="file"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-red-500 font-semibold">Don't Exceed 500kb</p>
          </div>

          {/* Price + Period */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Rental Period
              </label>
              <select
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
              </select>
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Electronic City, Bangalore"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              placeholder="Karan P."
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="gaming">Gaming</option>
              <option value="electronics">Electronics</option>
              <option value="tools">Tools</option>
              <option value="bikes">Bikes</option>
              <option value="cameras">Cameras</option>
              <option value="music">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item condition, accessories included, etc."
              className="w-full border rounded-lg px-4 py-2"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>

        </form>

      </div>
      </div>
      <Footer/>
    </div>
  );
}