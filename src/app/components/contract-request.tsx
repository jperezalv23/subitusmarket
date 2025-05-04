"use client";

import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface ContractRequestProps {
  worker: {
    id: number;
    name: string;
    profession: string;
  };
  onClose: () => void;
  onSend: (details: { description: string; price: string; date?: Date }) => void;
}

export default function ContractRequest({ worker, onClose, onSend }: ContractRequestProps) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({
      description,
      price,
      date,
    });
  };

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setDate(selectedDate);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = daysInMonth(year, month);
  const startDay = startOfMonth(year, month);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Solicitud de Contrato</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div>
              <label htmlFor="professional" className="block text-sm font-medium text-gray-700">
                Profesional
              </label>
              <input
                id="professional"
                value={`${worker.name} - ${worker.profession}`}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción del trabajo
              </label>
              <textarea
                id="description"
                placeholder="Describe el trabajo que necesitas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-[100px]"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio propuesto (USD)
              </label>
              <input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha propuesta</label>
              <div className="p-4 border rounded-md">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    onClick={handlePreviousMonth}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    &lt;
                  </button>
                  <h2 className="text-lg font-semibold">
                    {currentMonth.toLocaleString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    &gt;
                  </button>
                </div>

                {/* Days of the week */}
                <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 text-center">
                  {/* Empty cells for days before the start of the month */}
                  {Array.from({ length: startDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="text-gray-300"></div>
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: days }).map((_, day) => {
                    const date = day + 1;
                    const isSelected =
                      date === date &&
                      currentMonth.getMonth() === month &&
                      currentMonth.getFullYear() === year;

                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => handleDateClick(date)}
                        className={`p-2 rounded-full ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {date}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t p-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}