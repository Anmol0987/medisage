import Loader from "./components/Loader";
import { Navbar } from "./components/Navbar";
import MedicineSearch from "./pages/medicineSearch";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="bg-background-300 m-auto mx-80 my-10 flex justify-center">
        <MedicineSearch />
      </div>
    </>
  );
}
