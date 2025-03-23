import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './component/Employee/List';
import CreateForm from './component/Employee/Create';
import EditForm from './component/Employee/Edit';

function App() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/add" element={<CreateForm />} />
                <Route path="/edit/:id" element={<EditForm />} /> 
            </Routes>
        </Router>
    );
}

export default App;