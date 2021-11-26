import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddContact from './Components/AddContact';
import Contacts from './Components/Contacts';
import EditContact from './Components/EditContact';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element = { <Contacts />} />
        <Route path="/add-contact" element= { <AddContact />} /> 
        <Route path="/edit-contact/:id" element = { <EditContact /> } />
      </Routes>
    </Router>
  );
}

export default App;
