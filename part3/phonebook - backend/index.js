const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const personCount = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  //console.log(Date())
  response.send(`
    <p>Phonebook has info for ${personCount} people</p>
    <p>${Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = `Person with id "${request.params.id}" not found`
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random()*25000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  nameExists = false

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name missing' 
    })
  } else  if (!body.number) {
    return response.status(400).json({ 
      error: 'Number missing' 
    })
  } else {
    for (x in persons){
      if (persons[x].name === body.name){
        nameExists = true
      }
    }
    if (nameExists) {
      return response.status(400).json({ 
        error: 'Name must be unique' 
      })
    }
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || ""
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})