import { Navigate, Route, Routes } from "react-router-dom"
import Events from "../components/events/event"
import { MainLayout } from "../components/layout/MainLayout"
import Profile from "../components/profile/profile"
import { Picker } from "../components/picker/personaPicker"



export const PrivateRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Navigate to ="/events"/>} />
                <Route path="/events" element= {<Events/>}/>
                <Route path="/profile" element= {<Profile/>}/>
            </Route>
        </Routes>
    )
}