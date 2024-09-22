import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";
import CartContextProvider from "./components/providers/ContextProvider";

function App() {
  const [layout, setLayout] = useState(false);

  return (
    <>
      {/* <Button onClick={() => setLayout(!layout)}>Change Layout</Button> */}
      <CartContextProvider>
        <MainLayout />
      </CartContextProvider>
      {/* <AdminLayout /> */}
    </>
  );
}

export default App;
