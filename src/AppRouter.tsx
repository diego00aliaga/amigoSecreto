import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/home"
import type { ReactNode } from "react"
import { PrivateRouter } from "./guard/PrivateRouter"
import { PrivateGuard } from "./guard/PrivateGuard"
import { MainLayout } from "./components/layout/MainLayout"

interface Props{
    children?: ReactNode
}

export const AppRouter = ({children}: Props) => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path= "/" element= {<Home/>}/>
            <Route element={<PrivateGuard/>}>
                    <Route path="/private/*" element={<PrivateRouter/>} />
            </Route>
            <Route path= "*" element= {<Navigate to = "/404" />} />
            <Route path= "/404" element= {<h1>Página no encontrada</h1>} />
            {children}
        </Routes>
        </BrowserRouter>
    )
}