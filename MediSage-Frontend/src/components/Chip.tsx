
type ChipProps = {
  text: string;
  onClick?: (value: string) => void;
};

const Chip = ({ text, onClick }: ChipProps) => (
  <div
    className="w-fit cursor-pointer rounded-full border border-neutral-400 px-3 py-1 transition select-none hover:bg-blue-100"
    onClick={() => onClick && onClick(text)}
  >
    {text}
  </div>
);

export default Chip;
