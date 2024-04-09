
// Header Component for displaying course name
const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

// Part Component for displaying parts of the course and exercise
const Parts = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

// Content Component for displaying parts of the course
const Content = (props) => {
  return (
    <>
      <Parts name={props.content[0].name} exercises={props.content[0].exercises}/>
      <Parts name={props.content[1].name} exercises={props.content[1].exercises}/>
      <Parts name={props.content[2].name} exercises={props.content[2].exercises}/>
    </>
  )
}

// Total Component for displaying total number of exercise
const Total = (props) => {
  return (
    <p>
      Number of exercises : {props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}
    </p>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    content: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content content={course.content} />
      <Total content={course.content} />
    </div>
  )
}


export default App
