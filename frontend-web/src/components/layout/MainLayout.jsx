import React from "react";
import MainNavbar from "../ui/nav/navbar";
import Router from "../../router/Router";
import { Container } from "react-bootstrap";

const MainLayout = () => {
  return (
    <div>
      <MainNavbar />
      <Container>
        <Router />
      </Container>
    </div>
  );
};

export default MainLayout;
