import Home from './views/Home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000}></ToastContainer>
      <Home />
    </>
  );
}

export default App;
