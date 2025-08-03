type ChipProps = {
  text: string;
  onClick?: (value: string) => void;
};

const Chip = ({ text, onClick }: ChipProps) => (
  <div
    className="hover:bg-secondary hover:border-primary w-fit cursor-pointer rounded-full border border-neutral-400 px-3 py-1 transition select-none"
    onClick={() => onClick && onClick(text)}
  >
    {text}
  </div>
);

export default Chip;
