const Header = (props) => {
      return (
        <div>
          <h1>{props.name}</h1>
        </div>
      )
    }
    
    const Part = (props) => {
      return (<p>{props.parts.name} {props.parts.exercises}</p>)
    }
    
    const Content = (props) => {
      const differentParts = props.parts.map(element => { return <Part key={element.id} parts={element} /> } )
      return (
        <>
          {differentParts}
        </>
      )
    }
    
    
    const Total = (props) => {
      const totalAmount = props.parts.reduce((sum,p) => sum + p.exercises, 0)
      return (<p>total of {totalAmount} exercises</p>)
    } 
    
    const Course = (props) => {
      console.log(props)
      return (
        <div>
          <Header name={props.course.name} />
          <Content parts={props.course.parts}/>
          <Total parts={props.course.parts}/>
        </div>
      )
    }

    export default Course;