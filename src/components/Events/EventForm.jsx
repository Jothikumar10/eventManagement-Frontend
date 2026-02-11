import { useState } from "react";

export default function EventForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    location: initialData.location || "",
    category: initialData.category || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {initialData._id ? "Edit Event" : "Create Event"}
      </h2>

      <input
        name="title"
        placeholder="Event Title"
        className="w-full border p-2 rounded"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Event Description"
        className="w-full border p-2 rounded"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        required
      />

      <input
        type="date"
        name="date"
        className="w-full border p-2 rounded"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Category</option>
        <option value="Tech">Tech</option>
        <option value="Business">Business</option>
        <option value="Education">Education</option>
      </select>

      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Save Event
      </button>
    </form>
  );
}
