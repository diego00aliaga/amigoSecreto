import { useState } from "react";

interface AddGiftButtonProps {
  onAddGift: (giftName: string, price: string) => void;
}

export function AddGiftButton({ onAddGift }: AddGiftButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");

  const handleSave = () => {
    if (giftName.trim()) {
      onAddGift(giftName, giftPrice);
      setGiftName("");
      setGiftPrice("");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setGiftName("");
    setGiftPrice("");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
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

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
          onClick={handleCancel}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#ed4242]">🎁 Nuevo Regalo</h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Formulario */}
            <div className="space-y-4">
              {/* Campo Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del regalo
                </label>
                <input
                  type="text"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  placeholder="Ej: Libro de Harry Potter"
                  className="
                    w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                    focus:border-[#ed4242] focus:outline-none
                    transition-all duration-200
                  "
                  autoFocus
                />
              </div>

              {/* Campo Precio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio de referencia (opcional)
                </label>
                <input
                  type="text"
                  value={giftPrice}
                  onChange={(e) => setGiftPrice(e.target.value)}
                  placeholder="Ej: $25.000"
                  className="
                    w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                    focus:border-[#ed4242] focus:outline-none
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="
                  flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 
                  text-gray-700 font-semibold rounded-xl
                  transition-all duration-200
                "
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!giftName.trim()}
                className="
                  flex-1 px-4 py-3 bg-[#ed4242] hover:bg-[#d93636] 
                  text-white font-semibold rounded-xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}