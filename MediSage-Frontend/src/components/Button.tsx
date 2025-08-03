type ButtonProps = {
  text: String;
  onClick?: () => void;
};
const Button = ({ text,onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="rounded-md bg-secondary px-6 py-2 text-text transition hover:bg-teal-700 hover:transition-all hover:text-white">
      {text}
    </button>
  );
};

export default Button;
