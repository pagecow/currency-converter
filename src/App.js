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
        target_amount: '',
    }
  }

  componentDidMount = () => {
    axios
      .post('/api/ecb/forex/stats', {base_currency: this.state.base_currency, base_amount: this.state.base_amount, target_currency: this.state.target_currency})
      .then(res => {
        console.log(res.data)
        this.setState({
          base_currencies: res.data.currencies,
          target_currencies: res.data.currencies,
          target_amount: res.data.target_amount,
        })
      })
      .catch(err => console.log(err))
  }

  handleConversion = async (base_amount) => {
    this.setState({
      base_amount
    })

    axios
      .post('/api/ecb/forex/stats', {base_currency: this.state.base_currency, base_amount: base_amount, target_currency: this.state.target_currency})
      .then(res => {
        console.log(res.data)
        this.setState({
          base_currencies: res.data.currencies,
          target_currencies: res.data.currencies,
          target_amount: res.data.target_amount,
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    const {base_currencies, base_currency, base_amount, target_currencies, target_currency, target_amount} = this.state
    
    return (
      <div className="App">
        <form>
          <select id="base_currencies" placeholder={base_currency}>
          <option value="" disabled selected>EUR</option>
            {base_currencies.map(element => 
              <option>{element}</option>
              )}
          </select>
          <input placeholder={base_amount} onChange={e => this.handleConversion(e.target.value)}/>

          <br/>
          
          <select id="target_currencies" placeholder={target_currency}>
            <option value="" disabled selected>USD</option>
            {target_currencies.map(element => 
              <option>{element}</option>
              )}
          </select>
          <input placeholder={parseFloat(target_amount).toFixed(2)}/>
        </form>
      </div>
    );
  }
}

export default App;
