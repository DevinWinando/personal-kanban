import Card from "./components/Card";

function App() {
  return (
    <div className="h-screen flex container">
      <Card title="Task" />
      <Card title="In Progress" />
      <Card title="Done" />
    </div>
  );
}

export default App;
