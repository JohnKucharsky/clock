import ClockApi from "./ClockApi";
import ClockNoApi from "./ClockNoApi";

function App() {
  return (
    <div>
      <ClockNoApi />
      <ClockApi />
    </div>
  );
}

export default App;
