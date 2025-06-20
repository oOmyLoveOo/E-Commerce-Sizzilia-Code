import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Mensaje enviado correctamente ✅");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Error al enviar mensaje ❌");
        console.error(data.error);
      }
    } catch (error) {
      alert("Error de conexión al enviar ❌");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form onSubmit={handleSubmit} className="bg-pink-100 h-auto w-[90%] md:w-[40rem] flex flex-col p-8 rounded">
        <h2 className="underline font-bold font-mono md:text-3xl text-center py-4">Contáctanos</h2>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Name *" className="border-b outline-none flex-1" required />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email *" className="border-b outline-none flex-1" required />
        </div>

        <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject" className="border-b outline-none mt-10" required />

        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="border-b outline-none resize-none h-32 mt-8" required />

        <button type="submit" className="bg-black text-white font-bold tracking-wide hover:bg-gray-800 transition self-center mt-10 py-2 px-8 rounded cursor-pointer">
          ENVIAR
        </button>
      </form>
    </div>
  );
};

export default Contact;
