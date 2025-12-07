import { useEffect, useState } from "react"

const BACKEND_URL = "http://localhost:3000/v1/events"

function Events() {
    const [event, setEvent] = useState()


    useEffect(() =>{
        fetch(BACKEND_URL)
        .then(res => res.json())
        .then(data => setEvent(data.event))
        
    }, [])
    return (
        <div className="flex bg-[#ed4242] w-full min-h-screen bg-cover bg-center items-start justify-center pt-20 ">

            
            <article className="relative flex flex-col items-center md:w-1/2 justify-center text-center gap-2 p-10 bg-[#900000] backdrop-blur-md rounded-3xl  shadow-[0_0px_50px_rgba(255,_120,_255,_0.9)] max-w-lg mx-4 overflow-hidden cursor-pointer hover:bg-[#a5002a] transform transition-transform duration-300 hover:scale-110 ">
            {/* Efecto de luz superior (opcional) */}
            <div className="absolute top-0  -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50 blur-sm" />

            {/* Header: Estilo "Eyebrow" (Etiqueta superior) */}
            <header className="uppercase tracking-[0.3em] text-s font-bold text-yellow-400 mb-2">
                ✨ Navidad 2026 ✨
            </header>

            {/* H1: Tipografía grande con degradado */}
            <h1 className="text-2xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 drop-shadow-sm leading-tight">
                Sorteo<br/>
                <span className="text-indigo-200">Amigo Secreto</span>
            </h1>
            
            <p className="text-white/60 text-sm mt-2 font-light">
                Próximamente...
            </p>
            </article>
        </div>

    )
}


export default Events