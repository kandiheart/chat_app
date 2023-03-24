import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Homepage}/>
        <Route path="/chats" Component={ChatPage}/>
      </Routes>
    </div>
  );
}

export default App;
