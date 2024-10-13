import { useState } from "react";

const colorCodes = {
  Black: 0,
  Brown: 1,
  Red: 2,
  Orange: 3,
  Yellow: 4,
  Green: 5,
  Blue: 6,
  Violet: 7,
  Gray: 8,
  White: 9,
};

const CalculadoraResistencias = () => {
  const [band1, setBand1] = useState("Black");
  const [band2, setBand2] = useState("Black");
  const [band3, setBand3] = useState("Black");
  const [multiplier, setMultiplier] = useState("Black");

  const calculateResistance = () => {
    const value1 = colorCodes[band1];
    const value2 = colorCodes[band2];
    const value3 = colorCodes[band3];
    const multiplierValue = Math.pow(10, colorCodes[multiplier]);

    return (value1 * 100 + value2 * 10 + value3) * multiplierValue;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Calculadora de Resistencias</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Banda 1:</label>
          <select
            value={band1}
            onChange={(e) => setBand1(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(colorCodes).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Banda 2:</label>
          <select
            value={band2}
            onChange={(e) => setBand2(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(colorCodes).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Banda 3:</label>
          <select
            value={band3}
            onChange={(e) => setBand3(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(colorCodes).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Multiplicador:</label>
          <select
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(colorCodes).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Resistencia: {calculateResistance()} Ω
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraResistencias;
