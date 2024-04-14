const Persons = ({id, name, number, handleDelete}) => {
    return(
      <p>{name} {number} <button onClick={()=>handleDelete(id)}>
      Delete
    </button></p>
    )
  }

  export default Persons