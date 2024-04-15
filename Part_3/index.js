const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

let data = [
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

app.get('/api/persons',(request, response) => {
    response.json(data)
})

app.get('/info',(request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${data.length} persons</p>
         <br>
         <p>${date.toString()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = data.find(person => person.id === id)

    if(person){
        data = data.filter(person => person.id === id)
        response.status(204).json({success: 'Person successfully removed'})
    }
    else{
        response.status(400).json({error: 'Person with given id does not exist'})
    }
})

const generateId = () => {
    const randomId = Math.floor(Math.random () * 1000)
    if(data.find(person => person.id === randomId)){
        return randomId
    }
    else{
        generateId()
    }
    
}

const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post('/api/persons', postMorgan, (request, response) => {
 
    const personName = data.map(person => person.name)

    if(!body.name || !body.number){
        return response.status(400).json({error: 'name or number missing'})
    }else if (data.find((person)=>person.name.toLowerCase() === request.body.name.toLowerCase())){
        return response.status(400).json({error: 'Name already exist, name must be unique'})
    }else{
        const newperson = {
            id: generateId(),
            name: body.name,
            number: body.number,
        }

        data = data.concat(newperson)

        response.status(201).json({success: 'Person successfully created'})
    }  
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () =>console.log(`Server running on http://localhost:${PORT}`));