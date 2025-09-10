import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
