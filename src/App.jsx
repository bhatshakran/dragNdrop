import './App.css';
import CandidateGrid from './Components/CandidateGrid';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <CandidateGrid />
      </div>
    </DndProvider>
  );
}

export default App;
