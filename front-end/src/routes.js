import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Voluntario from "./views/Voluntario";
import ListaVoluntarios from "./views/ListaVoluntarios";
import Certificados from "./views/Certificados";
import EmissaoCertificado from "./views/EmissaoCertificado";

function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Voluntario' element={<Voluntario />} />
                <Route path='/ListaVoluntarios' element={<ListaVoluntarios />} />
                <Route path='/Certificados' element={<Certificados />} />
                <Route path='/EmissaoCertificado' element={<EmissaoCertificado />} />
                <Route path='*' element={<h1>Not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;