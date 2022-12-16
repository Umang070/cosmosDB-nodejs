import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import "./App.css";
import Home from "./views/Home";

function App() {
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem
        style={{
          alignItems: "center",
          fontWeight: 600,
          fontSize: "xx-large",
          marginTop: "5px",
          color: "#a69d9d",
        }}
      >
        Instagram Post Analysis
      </EuiFlexItem>
      <EuiFlexItem>
        <Home />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default App;
