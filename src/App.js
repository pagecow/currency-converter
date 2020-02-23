import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        base_currencies: [],
        base_currency: 'EUR',
        base_amount: '1',
        target_currencies: [],
        target_currency: 'USD',
        target_amount: '1.08',
    }
  }

  componentDidMount = () => {
      this.axiosPost(this.state.base_currency, this.state.base_amount, this.state.target_currency);
  }

  axiosPost = async (base_currency, base_amount, target_currency) => {
    axios
      .post('/api/ecb/forex/stats', {base_currency, base_amount, target_currency})
      .then(res => {
        console.log(res.data)
        this.setState({
          base_currencies: res.data.currencies,
          target_currencies: res.data.currencies,
          target_amount: res.data.target_amount,
        })
      })
      .catch(err => console.log(err));
  }

  handleRateConversion = async (base_amount) => {
    this.setState({
      base_amount
    });

    this.axiosPost(this.state.base_currency, base_amount, this.state.target_currency);
  }

  handleCurrencyConversion = async (base_currency, target_currency) => {
    this.setState({
      base_currency,
      target_currency
    });

    this.axiosPost(base_currency, this.state.base_amount, target_currency);
  }


  render() {
    const {base_currencies, base_currency, base_amount, target_currencies, target_currency, target_amount} = this.state
    
    return (
      <div className="App">
        <form>
          <select id="base_currencies" placeholder={base_currency} onChange={e => this.handleCurrencyConversion(e.target.value, target_currency)}>
          <option value="" disabled selected>{base_currency}</option>
            {base_currencies.map(element => 
              <option value={element}>{element}</option>
              )}
          </select>
          <input placeholder={base_amount} onChange={e => this.handleRateConversion(e.target.value)}/>

          <br/>
          
          <select id="target_currencies" placeholder={target_currency} onChange={e => this.handleCurrencyConversion(base_currency, e.target.value)}>
            <option value="" disabled selected>{target_currency}</option>
            {target_currencies.map(element => 
              <option value={element}>{element}</option>
              )}
          </select>
          <p>{parseFloat(target_amount).toFixed(2)}</p>
        </form>
      </div>
    );
  }
}

export default App;
