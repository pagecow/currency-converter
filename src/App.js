import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        base_currency: 'GBP',
        base_amount: '1',
        target_currency: 'IDR',
        target_amount: '',
    }
  }

  componentDidMount = () => {
    axios
      .post('/api/ecb/forex/stats', {base_currency: this.state.base_currency, base_amount: this.state.base_amount, target_currency: this.state.target_currency})
      .then(res => {
        console.log(res.data)
        this.setState({
          target_amount: res.data
        })
      })
  }

  handleConversion = (base_currency, base_amount, target_currency) => {

  }


  render() {
    const {base_currency, base_amount, target_currency, target_amount} = this.state
    
    return (
      <div className="App">
        <form>
          <input placeholder={base_currency}/>
          <input placeholder={base_amount}/>

          <br/>
          
          <input placeholder={target_currency}/>
          <input placeholder={target_amount}/>
        </form>
      </div>
    );
  }
}

export default App;
