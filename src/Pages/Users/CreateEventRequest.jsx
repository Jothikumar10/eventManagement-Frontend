import { useState } from "react";
import axios from "axios";

export default function CreateEventRequest() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("https://eventmanagementserver-3qnz.onrender.com/event-requests", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Event request sent to admin");
    setForm({ title: "", description: "", date: "", location: "" });
  };

  return (
    <form onSubmit={submit} className="max-w-xl p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Request New Event</h2>

      <input name="title" placeholder="Event Title" onChange={handleChange} className="input" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />
      <input name="date" type="date" onChange={handleChange} className="input" />
      <input name="location" placeholder="Location" onChange={handleChange} className="input" />

      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
        Submit Request
      </button>
    </form>
  );
}
