import Button from "./Button";
type InputProps = {
  type?: React.HTMLInputTypeAttribute | "text";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};
const Searchbar = ({type,placeholder,onChange,onSearch,value}: InputProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 rounded-md border bg-white border-gray-300  px-4 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <Button text="Submit" onClick={onSearch} />
    </div>
  );
};

export default Searchbar;
