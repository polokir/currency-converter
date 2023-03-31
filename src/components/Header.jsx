import { useEffect, useRef, useState } from 'react';
import './App.css';
import { CurrencyBox } from './CurrencyBox';

const Header = () => {
  const [fromCurrency, setFromCur] = useState('UAH');
  const [toCurrency, setToCur] = useState('EUR');
  const [fromValue, setFromVal] = useState(0);
  const [toValue, setToVal] = useState(0);
  const rates = useRef({});

  const onChangefromHandler = value => {
    const total = value / rates.current[fromCurrency];
    const result = total * rates.current[toCurrency];
    setFromVal(value);
    setToVal(result.toFixed(3));
  };

  const onChangetoHandler = value => {
    const result =
      (rates.current[fromCurrency] / rates.current[toCurrency]) * value;
    setToVal(value);
    setFromVal(result.toFixed(3));
  };

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
      .then(res => res.json())
      .then(data => {
        rates.current = data.rates;
      });
  }, []);

  useEffect(() => {
    onChangefromHandler(fromValue);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency]);

  useEffect(() => {
    onChangetoHandler(toValue);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency]);
  return (
    <div className="App">
      <CurrencyBox
        value={fromValue}
        currency={fromCurrency}
        currencyHandler={setFromCur}
        valueHandler={onChangefromHandler}
      />
      <CurrencyBox
        value={toValue}
        currency={toCurrency}
        currencyHandler={setToCur}
        valueHandler={onChangetoHandler}
      />
    </div>
  );
};

export default Header;
