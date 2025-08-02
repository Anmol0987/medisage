type ButtonProps = {
  text: String;
  onClick?: () => void;
};
const Button = ({ text,onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
      {text}
    </button>
  );
};

export default Button;
