import type { NextApiRequest, NextApiResponse } from 'next'

let KEYS: any = {}

function gerarKey() {
  const chars = "FreeGHIJKLMNOPQRSTUVWXYZ0123456789"
  const bloco = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `${bloco()}-${bloco()}-${bloco()}-${bloco()}`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = gerarKey()

  KEYS[key] = {
    used: false,
    expiresAt: Math.floor(Date.now() / 1000) + (10 * 60 * 60) // 10 HORAS
  }

  res.json({ key })
}

