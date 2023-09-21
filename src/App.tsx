import './App.css';
import SideBar from './components/Sidebar';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <SideBar
        appName={'DAYRY APP'}
        appDescription={'Comments with no sense'}
      />
      <div className="AppSync">
        <ItemList />
      </div>
    </div>
  );
}

export default App;
