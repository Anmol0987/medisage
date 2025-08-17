import { BriefcaseMedical } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="mt-4 mb-10 flex max-w-4xl items-center justify-between rounded-full bg-neutral-100 px-6 py-3 shadow-sm">
      <div className="rounded-full bg-neutral-400 p-2">
        <BriefcaseMedical color="#f5f5f5" />
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="text-lg font-medium text-neutral-400 transition-colors hover:text-neutral-500"
        >
          Medicine Summary
        </button>
        <button
          onClick={() => (window.location.href = "/report")}
          className="text-lg font-medium text-neutral-400 transition-colors hover:text-neutral-500"
        >
          Report Analysis
        </button>
      </div>
    </nav>
  );
};
