const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const request = (action) => () => {
    fetch(`http://192.168.1.118/${action}`, { method: "POST" })
      .then((response) => {
        if (response.ok) {
          console.log("Successful")

        } else {
          throw new Error("Request failed")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Arduino controller</h1>
      <Button handleClick={request("ON")} text="ON" />&nbsp;&nbsp;&nbsp;&nbsp;
      <Button handleClick={request("OFF")} text="OFF" />&nbsp;&nbsp;&nbsp;&nbsp;
      <Button handleClick={request("MID")} text="MID" />&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}

export default App
