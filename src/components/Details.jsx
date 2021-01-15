/** @format */

import React, { Component } from "react";
import {
  Media,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
export default class Details extends Component {
  state = {
    Comment: {
      comment: "",
      rate: null,
      elementId: this.props.match.params.id,
    },
    errMessage: "",
    loading: false,
    comments: [],
  };

  fetchReviews = async () => {
    try {
      const url = process.env.URL + `/comments/` + this.state.comment.elementId;
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        await this.setState({ comments: data });
        console.log(this.state.comments);
      }
    } catch (e) {
      console.log(e);
      console.log(this.state.comment.projectId);
    }
  };
  componentDidMount = async () => {
    this.fetchReviews();
  };

  updateReviewField = (e) => {
    let comment = { ...this.state.comment };
    let currentId = e.currentTarget.id;
    comment[currentId] = e.currentTarget.value;
    this.setState({ comment: comment });
  };

  submitReview = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let response = await fetch(process.env.URL + "/comments/", {
        method: "POST",
        body: JSON.stringify(this.state.comment),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        this.fetchReviews();
        alert("New Review saved!");
        this.setState({
          comments: {
            comment: "",
            rate: null,
            elementId: this.props.match.params.id,
          },
          errMessage: "",
          loading: false,
        });
      } else {
        <Alert variant="danger">Something went wrong</Alert>;
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };
  render() {
    console.log(this.props);
    return (
      <>
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        {this.state.errMessage ? (
          <Alert variant="danger">
            Something went wrong
            {this.state.errMessage}
          </Alert>
        ) : (
          <Container className="d-flex justify-content-center align-items-center text-center w-100">
            <Form
              className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center"
              style={{ flexDirection: "column" }}
              onSubmit={this.submitReview}
            >
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="comment">Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="What do u think about this project?"
                    value={this.state.Review.comment}
                    onChange={this.updateReviewField}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="rate">Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    id="rate"
                    placeholder="Give it a rate.."
                    value={this.state.Review.rate}
                    onChange={this.updateReviewField}
                    required
                  />
                </Form.Group>
              </Col>
              <Button type="submit">Submit</Button>
            </Form>
          </Container>
        )}

        <Container>
          <h1 className="text-left my-4">Reviews</h1>
          {this.state.comments &&
            this.state.comments.map((e) => (
              <Media className="reviewMedia">
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="http://placehold.it/30x30"
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>
                    {e.name} -- <Badge className="rateBadge">{e.rate}</Badge>
                  </h5>
                  <p>{e.comment}</p>
                </Media.Body>
              </Media>
            ))}
        </Container>
      </>
    );
  }
}
