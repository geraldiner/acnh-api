type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, disabled, type, onClick = undefined }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-sm hover:bg-purple-900 disabled:bg-purple-300 disabled:cursor-not-allowed disabled:text-gray-50"
    >
      {children}
    </button>
  );
}

export default Button;
