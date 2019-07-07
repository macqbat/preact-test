let poly = require("preact-cli/lib/lib/webpack/polyfills");
import { Provider } from 'preact-redux';
import store from './stores/store';
import App from './components/App';
import './style';
import habitat from 'preact-habitat';
import RatesDrawer from './ratesdrawer';

RatesDrawer.run(store);

const Widget = () => (
    <div id="outer">
    <Provider store={store}>
    <App />
    </Provider>
    </div>
);

let _habitat = habitat(Widget);
_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});