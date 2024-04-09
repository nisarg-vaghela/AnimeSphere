import React, { useState, useEffect } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useParams, Link } from "react-router-dom";
import { getUserReviews } from "../services/authService";
import { saveUser } from "../services/userService";
import { getUser } from "../services/userService";
import Moment from "moment";
import UserModal from "./userModal";
import "./user.css";
import CircularSpinner from "./circularSpinner";

const User = (props) => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fun() {
      setLoading(true);
      try {
        const { data } = await getUserReviews(id);
        setReviews(Object.values(data).reverse());
        const { data: userData } = await getUser(id);
        setUser(userData);
        // console.log("userData", userData);
        // console.log(data);
      } catch (err) {
        console.log(err);
        props.history.push("/not-found");
      }
      setLoading(false);
    }
    fun();
  }, [id, props?.history]);

  const handleModal = () => setModal(!modal);

  // const imgup = async (info) => {
  //   const newUser = { ...user };
  //   newUser.image = info.cdnUrl;
  //   setUser(newUser);
  //   console.log('Upload completed:', info);
  //   console.log("newUser", newUser);
  //   const savedUser = await saveUser(newUser);
  //   console.log("savedUser", savedUser);
  // }

  const handleEdit = async (newUser) => {
    const toBeSavedUser = { ...user };
    toBeSavedUser.image = newUser.image;
    toBeSavedUser.about = newUser.about;
    toBeSavedUser.name = newUser.name;
    setUser(toBeSavedUser);
    // console.log("toBeSavedUser", toBeSavedUser);
    /*const savedUser = */ await saveUser(toBeSavedUser);
    // console.log("savedUser", savedUser);

    props.changeUser(toBeSavedUser);
    // window.location.reload(); // when changing user name, name in navbar doesn't changed
  };

  const handleDateFormat = (date) => Moment(date).format("MMMM Do, YYYY");

  return (
    <>
      {loading ? (
        <CircularSpinner />
      ) : (
        <>
          <UserModal
            user={user}
            modalState={modal}
            toggle={handleModal}
            edit={handleEdit}
          />
          <div className="container text-light user-container d-flex flex-column">
            <div className="user-details">
              <div className="user-info0">
                <img
                  src={user.image}
                  alt="dp"
                  className="user-image"
                  loading="lazy"
                />
                <h1> {user.name} </h1>
                <p>Joined {handleDateFormat(user.register_date)}</p>
              </div>
              <div className="user-about bg-dark">
                <div className="d-flex flex-row">
                  <span>
                    <h3>About</h3>
                  </span>
                  {props.user && user._id === props.user._id && (
                    <button
                      className="btn btn-warning ms-4"
                      onClick={handleModal}
                    >
                      <i className="fa fa-pencil" /> Edit
                    </button>
                  )}
                </div>
                <div className="user-about0">{user.about}</div>
              </div>
            </div>
            <div className="user-reviews bg-dark">
              {reviews.length !== 0 && (
                <span
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  I have reviewed {reviews.length} anime
                </span>
              )}
              {reviews.map((review) => (
                <div className="user-review" key={review._id}>
                  <div className="d-flex flex-row">
                    <div>
                      <Link
                        to={`/anime/${review.anime.mal_id}#${review._id}`}
                        className="d-flex flex-column review-detail"
                      >
                        <img
                          src={review.anime.image_url}
                          alt="animeimage"
                          className="review-image"
                        />
                        <span>{review.anime.title}</span>
                      </Link>
                    </div>
                    <div className="d-flex flex-column ms-3 mt-2">
                      <div className="d-flex flex-row gap-4 ratings-det">
                        <div>Global Rating: {review.anime.score}</div>
                        <div>User Rating: {review.user_rating}</div>
                      </div>
                      <div className="mt-2">
                        {" "}
                        <ReactReadMoreReadLess
                          charLimit={400}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                        >
                          {review.comment}
                        </ReactReadMoreReadLess>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="mb-4">No reviews yet :(</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default User;
