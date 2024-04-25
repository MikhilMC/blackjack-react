import Header from "./components/Header";
import Table from "./components/Table";
import { BlackjackProvider } from "./context/BlackjackContext";

function App() {
  return (
    <BlackjackProvider>
      <div className="grid h-screen place-content-center bg-green-600">
        <Header />
        <Table />
      </div>
    </BlackjackProvider>
  );
}

export default App;
