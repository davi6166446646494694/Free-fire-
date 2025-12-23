export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // armazenamento em memória
  global.keys = global.keys || [];

  const chars = "FreeGHIJKLMNOPQRSTUVWXYZ0123456789FreeGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";

  for (let i = 0; i < 16; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
    if ((i + 1) % 4 === 0 && i !== 15) {
      key += "-";
    }
  }

  global.keys.push({
    key,
    usada: false,
    criadaEm: Date.now(),
    expiraEm: Date.now() + (56 * 60 * 60 * 1000) // 56 HORAS
  });

  res.status(200).json({ key });
}
