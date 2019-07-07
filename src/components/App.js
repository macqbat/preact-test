import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
import * as actions from '../stores/actions';

import CurrencyPane from './currency-pane';
import Middle from './middle';

import {CLASS_NAME_TOP, CLASS_NAME_BOTTOM, SET_RATES} from '../stores/constans';

@connect(store => store || {}, actions)
export default class App extends Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.ratesLoaded && this.props.ratesLoaded) {
            this._convert(this.props.currencyFrom, this.props.currencyTo, '0');
        }
    }

    handleAmountChange = (amount, className) => {
        this._convert(
            this.props.currencyFrom,
            this.props.currencyTo, amount,
            className === CLASS_NAME_BOTTOM
        );
    };

    _handleTargetChange = currency => {
        const previous = this.props.currencyTo;
        this.props.setChoosenTo(currency);
        if (currency === this.props.currencyFrom) {
            this.props.setChoosenFrom(previous);
            this._convert(previous, currency, this.state.amount);
        } else {
            this._convert(this.props.currencyFrom, currency, this.state.amount);
        }
    };

    _handleSourceChange = currency => {
        const previous = this.props.currencyFrom;
        this.props.setChoosenFrom(currency);
        if (currency === this.props.currencyTo) {
            this.props.setChoosenTo(previous);
            this._convert(currency, previous, this.state.amount);
        } else {
            this._convert(currency, this.props.currencyTo, this.state.amount);
        }

    };

    handleCurrencyChange = (currency, className) => {
        if (className === CLASS_NAME_TOP) {
            this._handleSourceChange(currency);
        } else if (className === CLASS_NAME_BOTTOM) {
            this._handleTargetChange(currency);
        }
    };

    reverseOrder = () => {
        const newFrom = this.props.currencyTo,
            newTo = this.props.currencyFrom,
            converted = this.state.converted;
        this._convert(newFrom, newTo, converted);
        this.props.setChoosenFrom(newFrom);
        this.props.setChoosenTo(newTo);
        this.setState({amount: converted});

    };

    _convert = (from, to, input, targetFlag) => {

        const intInput = parseFloat(+input.replace(',', '.')),
            fromBase = this.props.currencyList.find(item => item.id === from),
            toBase = this.props.currencyList.find(item => item.id === to),
            crossRate = toBase.rate / fromBase.rate;

        let readyToBuy, converted, amount;
        if (targetFlag) {
            amount = intInput / crossRate;
            readyToBuy = amount > 0 && amount <= fromBase.amount;
            amount = this._cleanCounted(amount);
            converted = this._cleanInput(input);
        } else {
            readyToBuy = intInput > 0 && intInput <= fromBase.amount;
            converted = this._cleanCounted(intInput * crossRate);
            amount = this._cleanInput(input);
        }

        this.setState({
            amount,
            converted,
            crossRate,
            readyToBuy
        });
    };

    _cleanCounted(counted) {
        if (Math.round(counted * 100) / 100 > 0) {
            counted = counted.toFixed(2).replace('.', ',');
        } else {
            counted = '0';
        }
        return counted;
    }

    _cleanInput(input) {
        input = input.toString()
            .replace('.', ',')
            .replace(/^0+/, '')
            .replace(/^,/, '0,');
        return input || '0';
    }

    exchange = () => {
        if (!this.state.readyToBuy) {
            return;
        }
        const amount = parseFloat(this.state.amount.replace(',', '.')),
            converted = parseFloat(this.state.converted.replace(',', '.'));

        this.props.substractFrom(this.props.currencyFrom, amount);
        this.props.addTo(this.props.currencyTo, converted);
        this._convert(this.props.currencyFrom, this.props.currencyTo, '0');
    };

    render(
        {currencyFrom, currencyList, currencyTo, ratesLoaded},
        {amount, crossRate, converted, readyToBuy}
    ) {
        const currencyFromFind = currencyList.find(i => i.id === currencyFrom),
            currencyToFind = currencyList.find(i => i.id === currencyTo);

        return (
            <div className="app">
                <CurrencyPane amount={amount}
                              classNameProp={CLASS_NAME_TOP}
                              currency={currencyFromFind}
                              currencyList={currencyList}
                              handleAmountChange={this.handleAmountChange}
                              handleCurrencyChange={this.handleCurrencyChange}
                />
                <Middle crossRate={crossRate}
                        currencyFrom={currencyFromFind.id}
                        currencyTo={currencyToFind.id}
                        reverseOrder={this.reverseOrder}
                />
                <CurrencyPane amount={converted}
                              classNameProp={CLASS_NAME_BOTTOM}
                              currency={currencyToFind}
                              currencyList={currencyList}
                              exchange={this.exchange}
                              handleAmountChange={this.handleAmountChange}
                              handleCurrencyChange={this.handleCurrencyChange}
                              readyToBuy={readyToBuy}
                />
            </div>
        );
    }
}
