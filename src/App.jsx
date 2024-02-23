import React, {useState} from 'react';
import './index.css';
import {v4 as uuidv4} from 'uuid';

const App = () => {

  // this function will get the current date and time for the messages
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric' };
    // format date to be like "January 1, 2022"
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    // format time to be like "12:00"
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return `${formattedDate}, at ${formattedTime}`;
  }
    // hooks to manage the state of the username, message and list of all messages
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([
      {
        id: uuidv4(),
        username: 'ngomis96',
        message: 'first message',
        dateTime: getCurrentDateTime()
      },
      {
        id: uuidv4(),
        username: 'ryanpro',
        message: 'second message',
        dateTime: getCurrentDateTime()
      },
      {
        id: uuidv4(),
        username: 'maitep18',
        message: 'third message',
        dateTime: getCurrentDateTime()
      }
    ]);;
    // function connected to form button to create a new message with the info
    const handleSubmit = e => {
        e.preventDefault();
        const newMessage =
        {
          id: uuidv4(), // id generator uuid
          username: username,
          message: message,
          dateTime: getCurrentDateTime()
        };
        // reset useState of message list, message and username
        setMessageList([...messageList, newMessage]);
        setUsername('');
        setMessage('');
    }

    return (
      // container div
      <div className="d-flex justify-content-around mt-5">
        <div className="form-card">
            <h4>Enter your Message</h4>
            <label htmlFor="name">Username</label>
            <div className="input-group">
              <span className="input-group-text" id="inputGroupPrepend"><i class="fa-solid fa-user"></i></span>
              <input id="name" className="form-control" value={username} type="text" onChange={e=> setUsername(e.target.value)} />
            </div>
            <label htmlFor="message">Message</label>
            <div className="input-group">
            <span className="input-group-text" id="inputGroupPrepend"><i class="fa-solid fa-pencil"></i></span>
            <input id="message" className="form-control" value={message} type="text" onChange={e=> setMessage(e.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="card messages-big-card">
          <h1>Messages</h1>
          <ul className="p-0">
            {messageList.map((message) => {
              return (
                <div className="card message-card">
                  <li className="card-body" key={message.id}>
                    <h5 className="card-subtitle mb-2 text-muted">@{message.username}</h5>
                    <p className="card-text m-0">{message.message}</p>
                    <small className="card-text text-muted pink-date">{message.dateTime}</small>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
}

export default App;
