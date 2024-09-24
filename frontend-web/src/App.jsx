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
      <CartContextProvider>
        <MainLayout />
      </CartContextProvider>
    </>
  );
}

export default App;
