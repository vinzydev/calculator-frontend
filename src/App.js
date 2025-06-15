import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setError('');
    try {
      const response = await axios.post('http://backend:5000/calculate', {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation,
      });
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Error calling backend. Is it running on http://localhost:5000?');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>Calculator</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
      <button
        onClick={handleCalculate}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Calculate
      </button>

      {result !== null && (
        <h3 style={{ marginTop: '20px' }}>Result: {result}</h3>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
      )}
    </div>
  );
}

export default App;
