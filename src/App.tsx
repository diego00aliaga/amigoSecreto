import { useState, useEffect } from 'react'
import {LISTA_DE_FOTOS} from '../public/data/fotos'


interface ImagenRandom {
  id: number;
  url: string;
  top: number;
  left: number;
  rotation: number;
}

function App() {
  const [images, setImages] = useState<ImagenRandom[]>([])
  // 2. Efecto para calcular la posición random al cargar
  useEffect(() => {
    // Definimos un tamaño aproximado de la imagen (ej. 100px) para que no se salga del borde
    const imageSize = 100; 
    
    const calculatedImages = LISTA_DE_FOTOS.map((nombreFoto, index) => {
      // Generamos valores aleatorios únicos para cada imagen
      const randomTop = Math.floor(Math.random() * (window.innerHeight - imageSize));
      const randomLeft = Math.floor(Math.random() * (window.innerWidth - imageSize));
      const randomRotation = Math.floor(Math.random() * 360);
      
      return {
          id: index,
          url: `./assests/imagenes/${nombreFoto}`,
          top: randomTop,
          left: randomLeft,
          rotation: randomRotation
      };
  });

  setImages(calculatedImages); // ¡Ahora esto funcionará sin errores!

  }, []) // El array vacío [] asegura que solo pase una vez al inicio

  return (
    // Agregamos 'relative' y 'overflow-hidden' al padre para controlar el posicionamiento
    <div 
      className="relative overflow-hidden flex justify-center items-center w-full min-h-screen bg-cover bg-center  bg-[#ed4242]"
    >    
        {images.map((img) => (
        <img 
          key={img.id} // React necesita una 'key' única para listas
          src={img.url}
          alt="Decoración random"
          className="absolute w-24 h-auto   transform hover:scale-110 transition-transform duration-300"
          style={{ 
            top: `${img.top}px`, 
            left: `${img.left}px`,
            transform: `rotate(${img.rotation}deg)` // Aplicamos la rotación aquí
          }} 
        />
      ))} 
<div className="flex flex-col items-center justify-center z-10 text-center gap-4 p-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl max-w-lg mx-4">
  
  {/* 1. Título Principal: Grande y con sombra para contraste */}
  <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
    AMIGO <br />
    <span className="text-yellow-300">SECRETO</span>
  </h1>
      <span className='text-medium text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] font-extrabold tracking-wider'>Los Loyola</span>
  {/* 2. El Año: Un poco más sutil, quizás con un badge o estilo diferente */}
  <div className="bg-white/90 text-red-600 px-6 py-1 rounded-full shadow-lg transform -rotate-2">
    <h2 className="text-3xl font-black tracking-widest">2025</h2>
  </div>

  {/* 3. El Mensaje: Más pequeño, limpio y con un icono si quieres */}
  <div className="mt-4 flex flex-col items-center gap-2">
    <span className="text-4xl">🚧</span>
    <h3 className="text-lg md:text-xl font-medium text-white/90 uppercase tracking-widest">
      Página en Construcción
    </h3>
    <p className="text-sm text-yellow-200 animate-pulse">
      ¡Vuelva pronto, traemos regalos!
    </p>
  </div>

</div>


      {/* 3. La imagen random */}
 
    </div>
  )
}

export default App