import { useState, useRef, useEffect } from "react";

interface AddGiftButtonProps {
  onAddGift: (giftName: string) => void;
}

export function AddGiftButton({ onAddGift }: AddGiftButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [giftName, setGiftName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para enfocar el input automáticamente cuando aparece
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSave = () => {
    if (giftName.trim()) {
      onAddGift(giftName); // Enviamos el dato al padre
      setGiftName("");     // Limpiamos
    }
    setIsAdding(false);    // Volvemos al modo botón
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
        setIsAdding(false);
        setGiftName("");
    }
  };

  // --- MODO 1: INPUT VISIBLE ---
  if (isAdding) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <input
          ref={inputRef}
          type="text"
          value={giftName}
          onChange={(e) => setGiftName(e.target.value)}
          onBlur={handleSave} // Si hace clic fuera, se guarda solo
          onKeyDown={handleKeyDown}
          placeholder="Escribe el regalo..."
          className="
            w-48 bg-white/10 border border-white/50 rounded-full 
            px-3 py-1 text-sm text-white placeholder-red-200/50 
            focus:outline-none focus:bg-white/20 focus:border-white transition-all
          "
        />
        {/* Pequeño icono de enter/guardar opcional */}
        <button onMouseDown={handleSave} className="text-white hover:text-yellow-300">
           ⏎
        </button>
      </div>
    );
  }

  // --- MODO 2: BOTÓN DELGADO (+ Agregar) ---
  return (
    <button
      onClick={() => setIsAdding(true)}
      className="
        group flex items-center gap-2 
        border border-white/30 hover:border-white 
        bg-transparent hover:bg-white/10 
        px-4 py-1 rounded-full 
        transition-all duration-300
      "
    >
      <span className="text-white/70 group-hover:text-white text-lg font-light leading-none pb-0.5">+</span>
      <span className="text-white/70 group-hover:text-white text-sm font-medium">
        Agregar regalo
      </span>
    </button>
  );
}