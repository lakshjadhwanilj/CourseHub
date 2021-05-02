import bcrpyt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@coursehub.com',
        password: bcrpyt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Laksh',
        email: 'laksh@coursehub.com',
        password: bcrpyt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Pratik',
        email: 'pratik@coursehub.com',
        password: bcrpyt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Payal',
        email: 'payal@coursehub.com',
        password: bcrpyt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John',
        email: 'john@example.com',
        password: bcrpyt.hashSync('123456', 10)
    }
]

export default users