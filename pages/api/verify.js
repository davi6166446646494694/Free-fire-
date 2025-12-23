export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  global.keys = global.keys || [];

  const { key, userId } = req.body;

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Key ausente"
    });
  }

  const registro = global.keys.find(k => k.key === key);

  if (!registro) {
    return res.status(403).json({
      success: false,
      message: "Key inexistente"
    });
  }

  if (registro.usada) {
    return res.status(403).json({
      success: false,
      message: "Key já usada"
    });
  }

  if (Date.now() > registro.expiraEm) {
    return res.status(403).json({
      success: false,
      message: "Key expirada"
    });
  }

  // marca como usada
  registro.usada = true;
  registro.usadaPor = userId || null;
  registro.usadaEm = Date.now();

  return res.status(200).json({
    success: true,
    message: "Key válida"
  });
}
