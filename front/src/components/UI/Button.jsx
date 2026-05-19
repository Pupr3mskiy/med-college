export default function Button({ children, onClick, type = 'button', disabled = false }) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      style={{
        padding: '10px 20px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
}