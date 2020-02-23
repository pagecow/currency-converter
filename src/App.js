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
        <header>
          <img src="http://www.mmsg.us/wp-content/uploads/2016/05/mmsg_no_caption_2.png" id="logo"/>

          <nav id="menu">
            <a href="http://www.mmsg.us/"><p className="menu-items">HOME</p></a>
            <a href="http://www.mmsg.us/management/"><p className="menu-items">LEADERSHIP</p></a>
            <a href="http://www.mmsg.us/philosophy/"><p className="menu-items">PHILOSOPHY</p></a>
            <a href="http://www.mmsg.us/testimonials/"><p className="menu-items">TESTIMONIALS</p></a>
          </nav>
        </header>
        
        <body>
          <div id="currency-converter-box">
            <div id="description">
              <p className="heading-1">{base_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {base_currency} equals</p>
              <p className="heading-2">{parseFloat(target_amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {target_currency} </p>
            </div>
            
            <div id="forms">
              <form className="form-1">
                <input placeholder={base_amount} onChange={e => this.handleRateConversion(e.target.value)}/>
                <select id="base_currencies" placeholder={base_currency} onChange={e => this.handleCurrencyConversion(e.target.value, target_currency)}>
                <option value="" disabled selected>{base_currency}</option>
                  {base_currencies.map(element => 
                    <option value={element}>{element}</option>
                    )}
                </select>
              </form>
                
              <form className="form-2"> 
                <p>{parseFloat(target_amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <select id="target_currencies" placeholder={target_currency} onChange={e => this.handleCurrencyConversion(base_currency, e.target.value)}>
                  <option value="" disabled selected>{target_currency}</option>
                  {target_currencies.map(element => 
                    <option value={element}>{element}</option>
                    )}
                </select>
              </form>
            </div>
          </div>
          
        </body>
        
      </div>
    );
  }
}

export default App;
