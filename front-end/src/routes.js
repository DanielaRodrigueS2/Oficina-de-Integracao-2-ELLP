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
                <Route path='/home' element={<Home />} />
                <Route path='/voluntario' element={<Voluntario />} />
                <Route path='/listaVoluntarios' element={<ListaVoluntarios />} />
                <Route path='/certificados' element={<Certificados />} />
                <Route path='/emissaoCertificado' element={<EmissaoCertificado />} />
                <Route path='*' element={<h1>Not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;