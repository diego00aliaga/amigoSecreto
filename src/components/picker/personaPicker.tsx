import  { useState } from 'react';

export const Picker = () => {
  // 1. Estado para saber qué personaje mostrar
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Tu lista de familiares
  const characters = [
    { id: 1, name: 'Anita', image: 'assests/characters/anita.png' },
    { id: 2, name: 'Beñy', image: 'assests/characters/beny.png' },
    { id: 3, name: 'Bianca', image: 'assests/characters/bianca.png' },
    { id: 4, name: 'David', image: 'assests/characters/david.png' },
    { id: 5, name: 'Diego', image: 'assests/characters/diego.png' },
    { id: 6, name: 'Florencia', image: 'assests/characters/flo.png' },
    { id: 7, name: 'Gaby', image: 'assests/characters/gaby.png' },
    { id: 8, name: 'Isa', image: 'assests/characters/isa.png' },
    { id: 9, name: 'María Isabel', image: 'assests/characters/maria.png' },
    { id: 10, name: 'Ramón', image: 'assests/characters/ramon.png' },
    { id: 11, name: 'Seba', image: 'assests/characters/seba.png' },
    { id: 12, name: 'Yaya', image: 'assests/characters/yaya.png' },
  ];

  const handleNext = () => {
    // Ciclo infinito: vuelve al inicio si llega al final
    setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  const handlePrev = () => {
    // Ciclo infinito: vuelve al final si llega al inicio
    setCurrentIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
  }

  const currentChar = characters[currentIndex];

  return (
    
<div className="relative w-full min-h-screen bg-[#ed4242] flex flex-col items-center justify-center overflow-hidden">
  <style>
        {`
          @keyframes custom-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>

    <h1 className="absolute top-12 text-4xl md:text-5xl font-extrabold text-white tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-center px-4">
        ¿Este eres tú?
    </h1>


    <div className="flex items-center justify-center gap-4 md:gap-10 w-full px-4 md:h-full md:w-150">
        
        <button onClick={handlePrev}>
            <i className="fa-solid fa-angle-left text-5xl text-yellow-300"></i>    
        </button>

        <div 
            className="relative group  transition-transform active:scale-95 mt-15 float 3s ease-in-out infinite"
            style={{ animation: 'custom-float 3s ease-in-out infinite' }}
        >
            <img 
            src={characters[currentIndex].image}
            className="relative w-full h-full md:w-full md:h-full  object-cover animate-in fade-in zoom-in duration-500"
            alt="Personaje"
            />

            <div className="mt-6 text-center">
                <h2 className="font-retro text-3xl text-white font-bold  tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">                    
                    {characters[currentIndex].name}
                </h2>
            </div>
        </div>  
      
        <button className='cursor-pointer' onClick={handleNext} >
            <i className="fa-solid fa-angle-right text-5xl text-yellow-300"></i>    
        </button>

    </div>
</div>
  );
};

