import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
// import { Home } from "./pages/home/Home";
import {Login} from "./pages/auth/Login";
import router from "./router/router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
      {router.map(({path,element:Page},index)=>(
        <Route key={index} index={!path?true :false} path={path} element={<Page/>}/>
      ))}
      </Route>
    </Routes>
  );
};

export default App;
