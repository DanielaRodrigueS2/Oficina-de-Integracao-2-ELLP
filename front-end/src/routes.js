import { BrowserRouter, Route, Routes } from "react-router-dom";

function routes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<h1>Not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;