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
        target_amount: '0',
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
        {/* <header>
          <img src="http://www.mmsg.us/wp-content/uploads/2016/05/mmsg_no_caption_2.png" id="logo"/>

          <nav id="menu">
            <a href="http://www.mmsg.us/"><p className="menu-items">HOME</p></a>
            <a href="http://www.mmsg.us/management/"><p className="menu-items">LEADERSHIP</p></a>
            <a href="http://www.mmsg.us/philosophy/"><p className="menu-items">PHILOSOPHY</p></a>
            <a href="http://www.mmsg.us/testimonials/"><p className="menu-items">TESTIMONIALS</p></a>
          </nav>
        </header> */}

        <header id="heading">
            <h4 className="page-title">Currency Converter</h4>
        </header>
        
        <body>
         
          
          <div id="currency-converter-box">
            <div id="description">
              <p className="heading-1">{base_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {base_currency} equals</p>
              <p className="heading-2">{parseFloat(target_amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {target_currency} </p>
            </div>
            
            <div id="forms">
              <form className="form-1">
                <select class="select-css" placeholder={base_currency} onChange={e => this.handleCurrencyConversion(e.target.value, target_currency)}>
                  {base_currencies.map(element => 
                    <option value={element}>{element}</option>
                    )}
                </select>
                <input className="input" placeholder={base_amount} onChange={e => this.handleRateConversion(e.target.value)}/>
              </form>
                
              <form className="form-2"> 
                <select class="select-css" placeholder={target_currency} onChange={e => this.handleCurrencyConversion(base_currency, e.target.value)}>
                  <option value="" disabled selected>{target_currency}</option>
                  {target_currencies.map(element => 
                    <option value={element}>{element}</option>
                    )}
                </select>
                <p className="target_amount">{parseFloat(target_amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </form>
            </div>
          </div>
        </body>

        <footer id="footer-1">
          <div className="left-footer-text">
            <h5 className="about">About Us</h5>
            {/* <img className="bottom-logo" src="http://ecbiz196.inmotionhosting.com/~mmsgus5/wp-content/uploads/2016/05/mmsg_footer_2.png"/> */}
            <p className="bottom-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            {/* <p className="address">100 Franklin Square Drive, Suite 430, Somerset, NJ 08873</p> */}
          </div>
          <div className="right-footer-text">
            <h5 className="general-info">General Information</h5>
            <ul>
              <a href="#"><li>Home</li></a>
              <a href="#"><li>About Us</li></a>
              <a href="#"><li>Contact</li></a>
/            </ul>
            
          </div>
        </footer>

        <footer id="footer-2">
          <p>© 2020 TJM. All rights reserved.</p>
        </footer>
        
      </div>
    );
  }
}

export default App;
