import React, { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const roomInputRef = useState(null);

  if (!isAuth) {
    return (
      <div>
        <Auth />
      </div>
    );
  }

  return (<div>
    {room ? <div>Chat</div>
      : <div className='room'>
        <h1 className='label-room'>Enter Room Name:</h1><br/>
        <input ref={roomInputRef} className='input-room'/><br/>
        <button className='btn-room' onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
      </div>}
  </div>)



}

export default App;
