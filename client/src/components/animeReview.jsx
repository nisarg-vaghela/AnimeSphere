import React, { useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import {
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";

const AnimeReview = (props) => {
  const { review, user, deleteReview } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const toggleModal = () => setModal(!modal);
  const confirmDelete = () => {
    toggleModal();
    deleteReview();
  };
  return (
    <div className="anime-review d-flex flex-column" id={review._id}>
      <div className="d-flex flex-row position-relative">
        <img
          src={review.user.image}
          className="user-img"
          alt="User_Image"
          loading="lazy"
        />
        <div className="user-info d-flex flex-column">
          <strong>
            <Link to={`/users/${review.user._id}`} className="user-name">
              {review.user.name}
            </Link>
          </strong>
          <span>Rated {review.user_rating} out of 10</span>
        </div>
        {user && review.user.name === user.name && (
          <>
            <Button
              className="mx-2 position-absolute"
              color="danger"
              style={{ right: 0 }}
              onClick={toggleModal}
              id="deleteTooltip"
              size="sm"
            >
              <i className="fa fa-times" />
            </Button>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="deleteTooltip"
              toggle={toggleTooltip}
            >
              Delete Review
            </Tooltip>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader>Delete Review</ModalHeader>
              <ModalBody>Are you sure buddy :(</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={confirmDelete}>
                  Delete
                </Button>{" "}
                <Button color="primary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>
      <div className="user-comment">
        <ReactReadMoreReadLess
          charLimit={400}
          readMoreText={"Read more ▼"}
          readLessText={"Read less ▲"}
        >
          {review.comment}
        </ReactReadMoreReadLess>
      </div>
    </div>
  );
};

export default AnimeReview;
