import { useState } from 'react'


const Title = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Anecdotes = (props) => {
  return(
    <div>
      <div>- Anecdotes : {props.anecdotes}</div>
      <div>- Votes : {props.votes}</div>
    </div>
  )
}

const Button = (props) => {
  return (
  <div>
    <button onClick={props.handleClick}>{props.text}</button>
  </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <div>- Anecdotes : {props.anecdotes}</div>
      <div>- Votes : {props.max}</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selection, setSelection] = useState(0)
  const [vote, setvote] = useState(Array(anecdotes.length).fill(0))

  const nextClick = () => {
    // selecting the random anecdotes
    setSelection(Math.floor(Math.random() * anecdotes.length))
  }

  const voteClick = () => {
    const newVotes = [...vote]
    newVotes[selection] += 1
    setvote(newVotes)
  }

  
  const maxVote = Math.max(...vote)
  const indexAnecdote = vote.indexOf(maxVote)

  return (
    <div>
      <Title text='Anecdote of the day'/>
      <Anecdotes anecdotes={anecdotes[selection]} votes={vote[selection]}/>
      <Button handleClick={nextClick} text='next anecdote'/>
      <Button handleClick={voteClick} text='vote'/>
      <Title text='Anecdote with most votes'/>
      <MostVotes anecdotes={anecdotes[indexAnecdote]} max={maxVote} />
    </div>
  )
}

export default App;