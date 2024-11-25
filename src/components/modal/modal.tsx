import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({
  isOpen,
  onClose,
  onSave,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
      
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-red-500">
            X
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-4">{children}</div>

        {/* Rodapé do Modal */}
        <div className="flex justify-end items-center gap-4 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Fechar
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
