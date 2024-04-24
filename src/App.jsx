import Header from "./components/Header";
import Table from "./components/Table";
import { BlackjackProvider } from "./context/BlackjackContext";

function App() {
  return (
    <BlackjackProvider>
      <div className="grid place-content-center bg-green-600 h-screen">
        <Header />
        <Table />
      </div>
    </BlackjackProvider>
  );
}

export default App;
