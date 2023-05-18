import React, { useState, useEffect } from "react"

const Display = ({ stat }) => {
  return (
    <div>
      <div>
        {stat}
      </div>
      <br />
    </div >
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [stat, setStat] = useState("INIT")
  const [reqQueue, setReqQueue] = useState([])
  const [isRequesting, setIsRequesting] = useState(false)

  console.log("Remaining queues : ", reqQueue)

  const setQueue = (queues) => () => {
    const copy = [...queues]
    setReqQueue(copy)
  }

  const removeQueue = (numToRemove) => {
    console.log("Number to remove queues : ", numToRemove)
    setReqQueue((prevQueue) => prevQueue.slice(numToRemove))
  }

  const request = () => {
    if (isRequesting) return
    setIsRequesting(true)
    console.log("Requesting")
    const loopQueue = [...reqQueue]
    let countToRemove = 0

    const requesting = loopQueue.map((queue) =>
      fetch(`http://192.168.1.118/${queue}`, { method: "POST" })
        .then((response) => {
          if (response.ok) {
            countToRemove += 1
            const returned_stat = response.url.split("/")[3]
            setStat(returned_stat)
          } else {
            throw new Error("Request failed")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    )

    Promise.all(requesting)
      .then(() => {
        console.log("Not requesting anymore")
        removeQueue(countToRemove)
        setIsRequesting(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (reqQueue.length > 0)
      request()
  }, [reqQueue]);

  return (
    <div>
      <h1>Arduino controller</h1>
      <Display stat={stat} />
      <Button handleClick={setQueue([...reqQueue, "ON"])} text="ON" />&nbsp;&nbsp;&nbsp;&nbsp;
      <Button handleClick={setQueue([...reqQueue, "OFF"])} text="OFF" />&nbsp;&nbsp;&nbsp;&nbsp;
      <Button handleClick={setQueue([...reqQueue, "MID"])} text="MID" />&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}

export default App
