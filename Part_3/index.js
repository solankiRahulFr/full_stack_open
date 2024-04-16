
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
// This will help us connect to the database
const Person = require('./Person.js')

app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))


app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const date = new Date()
    Person
        .find({})
        .then(result => {
            response.send(
                `<p>Phonebook has info for ${result.length} persons</p>
             <br>
             <p>${date.toString()}</p>`
            )
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})



const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post('/api/persons', postMorgan, (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save()
            .then(person => {
                response.json(person)
            })
            .catch(error => { next(error) })
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const badEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

// handler of requests with bad endpoint
app.use(badEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

