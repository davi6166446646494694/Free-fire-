export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { key, userId } = req.body;

  if (!key || key.length < 10) {
    return res.status(200).json({ success: false });
  }

  // SEM BANCO → SEM INVALIDAR
  // Apenas aceita a key
  return res.status(200).json({
    success: true,
    userId: userId,
    time: Date.now()
  });
}
