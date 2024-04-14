const Notification = ({ msg, pattren }) => {
    if (!msg) return null;
    return (
      <p className={pattren==='error'? 'error':'success'}>
        {msg}
      </p>
    )
  }

  export default Notification;