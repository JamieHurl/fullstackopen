const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <h2>Add new</h2>
        <div>
          Name: <input value={props.nameEntry} onChange={props.onChangeName}/>
        </div>
        <div>
          Number: <input value={props.numberEntry} onChange={props.onChangeNumber}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }

  export default PersonForm