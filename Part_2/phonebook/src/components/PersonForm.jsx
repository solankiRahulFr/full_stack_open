const PersonForm = ({onSubmitHandler, handleInputs, valName, valNumber}) => {

    return (
      <form onSubmit={onSubmitHandler}>
        <div>
          Name:  <input id="name" value={valName} onChange={handleInputs} />
          Number: <input id="number" value={valNumber} onChange={handleInputs} />
        </div>
        <button type="submit">add</button>
      </form>
    )
  }

  export default PersonForm;