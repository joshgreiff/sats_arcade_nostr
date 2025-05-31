import NostrLoginNDK from "./components/NostrLoginNDK";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Sats Arcade</h1>
      <NostrLoginNDK />
    </div>
  );
}
