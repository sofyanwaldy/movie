import { Movie } from './components/Movie'
import {  Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducer/rootReducer'

const store = createStore(rootReducer)

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Movie />
        </div>
      </div>
    </Provider>
  );
}

export default App;
