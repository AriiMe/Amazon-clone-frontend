/** @format */

import React from "react";

import "./home.css";

import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import AddProduct from "./AddProduct.jsx";
import Product from "./Product";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Container fluid className=" px-0">
          <img
            className="home_image"
            src="https://images-eu.ssl-images-amazon.com/images/G/03/kindle/journeys/YTNkYTJjMWMt/YTNkYTJjMWMt-NDY4MDlmYmEt-w1500._CB412282544_.jpg"
            style={{ height: "600px", width: "100%" }}
            alt="home image"
          ></img>
          <Row>
            <AddProduct />

            <Row className="d-flex justify-content-around">
              <Product {...this.props} />
              <Product {...this.props} />
            </Row>
            {/* <div className="home_row">

         
        </div>
        <div className="home_row">

          <Product />
          <Product />
          <Product />

 GetProducts/Frontend
          <Product />
        </div> */}
          </Row>

          <div className="home_row"></div>
        </Container>
      </div>
    );
  }
}

export default Home;
