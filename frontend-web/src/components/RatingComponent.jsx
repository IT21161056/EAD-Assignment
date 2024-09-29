import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const RatingComponent = ({ show, handleClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // Initial rating value set to 0

  //save vendor feedback in db
  const handleSave = () => {
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a feedback & rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="feedbackTextarea">
              <Form.Label>Enter feedback:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ratingRange">
              <Form.Label>Enter rating: {rating}/10</Form.Label>
              <Form.Range
                min="0"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RatingComponent;
