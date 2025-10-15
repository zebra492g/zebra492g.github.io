// /api/chat.js
export default async function handler(req, res) {
  try {
    const { message } = req.body;
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Send user input to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
        messages: [
          { role: "system", content: "You are a friendly travel-planning assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });

    if (data.error) {
      throw new Error(data.error.message);
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
    res.status(500).json({ error: "Failed to connect to OpenAI API." });
  }
}
}
