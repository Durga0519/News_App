import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const NewsList = ({ articles }) => (
  <Row>
    {articles.map(article => (
      <Col md={4} key={article.title} className="mb-4">
        <Card>
          <Card.Img variant="top" src={article.image} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default NewsList;
