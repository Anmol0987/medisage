import { Navbar } from "./components/Navbar";
import MedicineSearch from "./pages/medicineSearch";

export default function App() {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center my-10 bg-amber-300 m-auto mx-80">
      <MedicineSearch />
    </div>
    </>
  );
}
