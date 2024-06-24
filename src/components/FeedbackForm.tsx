import { useState } from "react";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label>
        Name
        <input type="text" id="name" name="name" required />
      </label>
      <label>
        Email
        <input type="email" id="email" name="email" required />
      </label>
      <label>
        Message
        <textarea id="message" name="message" required />
      </label>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
