import './App.css';
import Chart from './components/Chart/Chart';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';


function App() {
  return (
    <div className="App">
       <div className="layout">
            <Sidebar/>
            <Main/>
            <div className='chart'>
                <Chart />
            </div>
       </div>
    </div>
  );
}

export default App;
