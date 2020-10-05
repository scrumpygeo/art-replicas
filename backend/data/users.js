import brcypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: brcypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Fred Blogs',
    email: 'fred@example.com',
    password: brcypt.hashSync('123456', 10),
  },
  {
    name: 'Wilma Flintstone',
    email: 'wilma@example.com',
    password: brcypt.hashSync('123456', 10),
  },
]

export default users
