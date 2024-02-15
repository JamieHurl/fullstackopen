const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
      <h1>
        {props.course}
      </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part title={props.parts[0].name} count={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} count={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} count={props.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.title} {props.count}
      </p>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Number of exercises {props.content}
      </p>
    </div>
  )
}

export default App