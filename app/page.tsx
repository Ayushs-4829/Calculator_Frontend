"use client";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Read API URL from .env

export default function Calculator() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [operation, setOperation] = useState("add");
    const [result, setResult] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (num1 === "" || num2 === "") {
            setResult("Please enter both numbers");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/${operation}`, {
                num1: parseFloat(num1),
                num2: parseFloat(num2),
            });
            setResult(response.data.result ?? response.data.error);
        } catch (error) {
            setResult("Error: Unable to connect to server");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Calculator</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="Enter first number"
                        className="border p-2 w-full rounded text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="Enter second number"
                        className="border p-2 w-full rounded text-gray-800"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="border p-2 w-full rounded text-gray-800"
                    >
                        <option value="add">Addition (+)</option>
                        <option value="subtract">Subtraction (-)</option>
                        <option value="multiply">Multiplication (×)</option>
                        <option value="divide">Division (÷)</option>
                    </select>
                </div>
                <button
                    onClick={handleCalculate}
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 transition"
                >
                    Calculate
                </button>
                {result !== null && (
                    <div className="mt-4 p-3 bg-gray-200 text-center rounded text-gray-900 font-semibold">
                        <strong>Result:</strong> {result}
                    </div>
                )}
            </div>
        </div>
    );
}
