import { useState } from "react";

type BadgeProps = {
  text: string;
};
const Badge = ({ text }: BadgeProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`w-fit cursor-pointer rounded-full border border-neutral-400 px-2 py-1 transition ${
        active ? "border-blue-400 bg-blue-200 text-blue-900" : "bg-white"
      }`}
      onClick={() => setActive((prev) => !prev)}
    >
      {text}
    </div>
  );
};

export default Badge;
