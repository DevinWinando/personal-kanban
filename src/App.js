import Card from "./components/Card";

function App() {
  return (
    <div className="h-screen flex container">
      <Card title="Task" category="task" />
      <Card title="In Progress" category="progress" />
      <Card title="Done" category="done" />
    </div>
  );
}

export default App;
