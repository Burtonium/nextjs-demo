
const CurrencySelect = ({currencies, selected, onChange } = { currencies: [] }) => (
  <div className="select">
    <select value={selected} onChange={onChange}>
      {currencies.map((currency) => 
        <option value={currency} key={currency}>{currency}</option>
      )}
    </select>
  </div>
);
export default CurrencySelect;