import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Card = (props) => {
  const [anime, setAnime] = useState({});
  const [genres, setGenres] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setAnime(props.anime);
    const newGenres = props.anime.genres.map((genre) => genre.name);
    setGenres(newGenres);
  }, [props.anime]);

  function handleClick(e) {
    e.preventDefault();
    history.push(`/anime/${anime.mal_id}`);
  }
  return (
    <React.Fragment>
      <div
        className="card shadow text-white bg-dark mb-2 ho"
        style={{ cursor: "pointer" }}
      >
        <div className="middle" onClick={handleClick}>
          <div className="text" style={{ fontWeight: "bold" }}>
            Know Me Senpai!
          </div>
        </div>
        <div className="row no-gutters card-outer">
          <div className="col-md-4 img-temp">
            <img
              className="card-img-top"
              src={anime.image_url}
              alt="img"
              loading="lazy"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{anime.title}</h5>
              <p className="card-text small">
                {genres && genres.join(", ")}
                <br />
                <span style={{ color: "#FF355E" }}>
                  {" "}
                  Rating: {anime.rating}
                </span>
              </p>
            </div>
            <div className="b card-footer">
              <small className="text-muted">
                <span style={{ color: "	#29AB87" }}>
                  Rated - {anime.score}/10
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
