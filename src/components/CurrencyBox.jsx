import './CurrencyBox.css'



const CURRENCIES = ['UAH','USD','EUR']
export const CurrencyBox = ({value,currency,valueHandler,currencyHandler}) =>{
    return (
        <div className="currency-box">
            <ul className="currency-button-panel">
                {CURRENCIES.map((item) => <li key={item} onClick={()=>currencyHandler(item)} className={item === currency ? 'active' : 'currency-button'}>{item}</li>)}
            </ul>
            <input onChange={(e) =>valueHandler(e.target.value)} value={value} placeholder='0' type="number" className=''/>
        </div>
    )
}