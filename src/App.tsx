import './App.css';
import SideBar from './components/Sidebar';
import ItemList from './components/ItemList';
import CommentsList from './components/CommentsList';

function App() {
  return (
    <div className="App">
      <SideBar
        appName={'DAYRY APP'}
        appDescription={'Comments with no sense'}
      />
      <div className="AppSync">
        <ItemList />
        <CommentsList />
      </div>
    </div>
  );
}

export default App;
