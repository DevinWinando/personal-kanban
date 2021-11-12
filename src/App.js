import Card from "./components/Card";

function App() {
  return (
    <div className="h-screen grid grid-cols-3 gap-0 container">
      <Card title="Task" />
      <Card title="In Progress" />
      <Card title="Done" />
    </div>
  );
}

export default App;
