import React from "react";
import Favorites from "./favorites";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { useState } from "react";

export default function Nav({localstorage, UpperCaseAndSplit, getPokeMonData, closeOffcanvas, showOffcanvas}) {
  return (
    <>
      <Navbar expand={false}>
        <Container fluid>
          <Navbar.Offcanvas
            show={showOffcanvas}
            className={`boxOfPokemon`}
            placement="end"
            onHide={closeOffcanvas}
          >
            <Offcanvas.Header closeButton onClick={closeOffcanvas}>
              <h1>Favorites</h1>
            </Offcanvas.Header>
            <Offcanvas.Body className="scrollBarFav">
              <Favorites
                pokemon={localstorage}
                uppercase={UpperCaseAndSplit}
                data={getPokeMonData}
                closeNav={closeOffcanvas}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
