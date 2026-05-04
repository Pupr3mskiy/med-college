export default function Input({ type = 'text', value, onChange, placeholder, label, error }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: error ? '1px solid red' : '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </div>
  );
}