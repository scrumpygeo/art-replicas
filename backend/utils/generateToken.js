import jwt from 'jsonwebtoken'

// takes id which is our payload
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export default generateToken
