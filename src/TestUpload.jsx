import { useState, useRef } from 'react';
import axios from 'axios';

export default function TestUpload() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post('/api/test-upload', formData);
      setResult(data);
      
      // Log to console as requested
      console.log('Test Results:', data);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Resume Upload Test</h2>
      <input 
        type="file" 
        ref={fileInputRef}
        accept=".pdf"
        style={{ margin: '10px 0' }}
      />
      <button 
        onClick={handleUpload}
        disabled={loading}
        style={{
          padding: '10px 15px',
          background: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Upload'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd' }}>
          <h3>Test Results:</h3>
          <p>Text Length: {result.textLength} characters</p>
          <p>Keywords:</p>
          <ul>
            {result.keywords.map((kw, i) => (
              <li key={i}>{kw}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}