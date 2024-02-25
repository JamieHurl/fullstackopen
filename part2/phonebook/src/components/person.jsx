import personService from '../services/persons'

const Person = (props) =>{
    //console.log(props)
    return(
      <div key={props.id}>{props.name}, no: {props.number}
        <button onClick={props.deleteUser}
        >Delete</button>
      </div>
    )
  }

export default Person