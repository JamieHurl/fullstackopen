const Filter = (props) => {
    return (
      <div>
        Filter: <input value={props.text} onChange={props.onChange}/>
      </div>
    )
  }

  export default Filter