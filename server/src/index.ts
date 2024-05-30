import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()
const port = 8080

app.use(bodyParser.json())
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    next()
  }, 1000)
})

type User = {
  id: number
  username: string
  email: string
}

const users: User[] = [
  { id: 1, username: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: 2, username: 'Bob Smith', email: 'bob.smith@example.com' },
  { id: 3, username: 'Carol White', email: 'carol.white@example.com' },
  { id: 4, username: 'David Brown', email: 'david.brown@example.com' },
  { id: 5, username: 'Eve Davis', email: 'eve.davis@example.com' },
  { id: 6, username: 'Frank Wilson', email: 'frank.wilson@example.com' },
  { id: 7, username: 'Grace Lee', email: 'grace.lee@example.com' },
  { id: 8, username: 'Henry Kim', email: 'henry.kim@example.com' },
  { id: 9, username: 'Isabella Moore', email: 'isabella.moore@example.com' },
  { id: 10, username: 'Jack Taylor', email: 'jack.taylor@example.com' },
]

let nextUserId = 11

app.get('/', (req: Request, res: Response) => {
  res.send({
    statusCode: 200,
    message: 'Success',
  })
})

app.get('/users', (req: Request, res: Response) => {
  res.send({
    statusCode: 200,
    data: users,
  })
})

app.get('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const user = users.find((user) => user.id === +userId)
  const statusCode = user ? 200 : 404
  res.send({
    statusCode,
    data: user,
  })
})

app.post('/users', (req: Request, res: Response) => {
  const newUser: User = {
    id: nextUserId++,
    ...req.body,
  }
  users.push(newUser)
  res.send({
    statusCode: 201,
    data: newUser,
  })
})

app.put('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const userIndex = users.findIndex((u) => u.id === +userId)
  if (userIndex > -1) {
    users[userIndex] = { ...users[userIndex], ...req.body }
    res.send({
      statusCode: 204,
      data: users[userIndex],
    })
  } else {
    res.send({
      statusCode: 404,
      data: null,
    })
  }
})

app.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const userIndex = users.findIndex((u) => u.id === +userId)
  if (userIndex > -1) {
    const deletedUser = users.splice(userIndex, 1)
    res.json(deletedUser[0])
    res.send({
      statusCode: 204,
      data: deletedUser[0],
    })
  } else {
    res.send({
      statusCode: 404,
      data: null,
    })
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
