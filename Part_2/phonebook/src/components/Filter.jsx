const Filter = ({filterValue, handleFilter}) => {
    return (
      <div>
        Filter shown with <input value={filterValue} onChange={handleFilter} />
      </div>
    )
  }

  export default Filter;