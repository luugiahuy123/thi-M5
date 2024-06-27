import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {BookCreate} from "./components/book/BookCreate";
import Book from "./components/book/Book";
import Master from "./pages/Master/Master";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Master/>}>
                        <Route path={"/"} element={<Book/>}></Route>
                        <Route path={"/create"} element={<BookCreate/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
