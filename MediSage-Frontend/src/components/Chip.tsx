type ChipProps = {
  text: string;
  onClick?: (value: string) => void;
};

const Chip = ({ text, onClick }: ChipProps) => (
  <div
    className="
      hover:bg-blue-100 
      w-fit cursor-pointer select-none 
      rounded-full border border-neutral-400
      px-2 py-0.5 text-xs 
      sm:px-3 sm:py-1 sm:text-sm 
      md:px-4 md:py-1.5 md:text-base
      transition
    "
    onClick={() => onClick?.(text)}
  >
    {text}
  </div>
);

export default Chip;
