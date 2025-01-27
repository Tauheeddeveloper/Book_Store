import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use BrowserRouter
import toast, { Toaster } from 'react-hot-toast';
import Layout from "./Layout";
import Book from "./Book";
import Login from "./Login";
import Signup from "./Signup";
import Contact from "./Contact";

const App = () => { // Correct arrow function syntax
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/books" element={<Book/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Toaster  
        />
    </>
  );
};

export default App;
