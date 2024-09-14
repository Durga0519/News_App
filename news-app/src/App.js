import React, { useState, useEffect } from 'react';
import NewsList from './NewsList'; // Ensure this component is correctly implemented
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [countries] = useState(['us', 'uk', 'ca', 'au', 'in']); // Add more country codes as needed
  const [categories] = useState(['business', 'sports', 'technology', 'health', 'entertainment']); // Available categories

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/news?country=${selectedCountry}&category=${selectedCategory}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles); // Ensure that data.articles is the correct structure
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setError('Error fetching news');
        setLoading(false);
      });
  }, [selectedCountry, selectedCategory]); // Refetch news whenever selectedCountry or selectedCategory changes

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">News App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        <Form.Control
          as="select"
          className="ml-auto"
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.toUpperCase()}
            </option>
          ))}
        </Form.Control>
        <Form.Control
          as="select"
          className="ml-auto"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </Form.Control>
      </Navbar>
      <Container className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>} {/* Added text-danger class for error styling */}
        {!loading && !error && <NewsList articles={articles} />}
      </Container>
    </div>
  );
}

export default App;
