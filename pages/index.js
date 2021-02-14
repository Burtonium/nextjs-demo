import 'components/CurrencySelect';
import { useState } from 'react';
import { uniq } from 'lodash';
import CurrencySelect from 'components/CurrencySelect';
import { fetchMarkets } from 'api/client';
import { getMarkets } from 'api/server';

export const getServerSideProps = async () => {
  const { markets } = await getMarkets();
  return { props: { markets } };
}

const Home = (props) => {
  const initialData = props.markets;
  const { markets, isLoading, isError } = fetchMarkets({ initialData });
  const baseCurrencies = uniq(markets.map(({ baseAsset }) => baseAsset));
  const [selected, setSelected] = useState(baseCurrencies[0]);
  const quoteMarkets = markets.filter(({ baseAsset }) => baseAsset === selected);

  return isError
    ? <div className="has-text-danger">Something went wrong</div>
    : (
      <div>
        <CurrencySelect
          currencies={baseCurrencies}
          selected={selected}
          onChange={(evt) => setSelected(evt.target.value)}/>
        <div>
          {quoteMarkets.map(({ quoteAsset, price, symbol }) => (
            <p key={symbol}>
              1 {selected} is <b className="gradient-underline">{price} {quoteAsset}</b>
            </p>
          ))}
        </div>
      </div>
    );
}

export default Home;