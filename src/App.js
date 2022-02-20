import "./App.css";
import { useState } from "react";
const URL = "http://api.exchangeratesapi.io/v1/latest?access_key=";
const API_KEY = "d2a384ce678331477a577dfd4b96f5f5";

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  return (
    <div id="content">
      <form onSubmit={convert}>
        <div>
          <label>EUR</label>
          <input
            type="number"
            step="0.01"
            value={eur}
            onChange={(e) => setEur(e.target.value)}
          />
          <output>{rate}</output>
        </div>
        <div>
          <label>GBP</label>
          <output>{gbp.toFixed(2)} £</output>
        </div>
        <div>
          <button>Convert</button>
        </div>
      </form>
    </div>
  );

  async function convert(e) {
    e.preventDefault();

    const address = URL + API_KEY;
    const response = await fetch(address);

    if (response.ok) {
      const json = await response.json();
      setRate(json.rates.GBP);

      setGbp(eur * json.rates.GBP);
    } else {
      alert("Error retrieving exchange rate.");
    }
  }
}
export default App;
