import React from "react";

const AnimeContent = (props) => {
  const { anime, score } = props;
  return (
    <div className="anime-details">
      <div className="anime-img">
        <img src={anime.image_url} alt="" loading="lazy" />
      </div>

      <div className="anime-body bg-dark">
        <div className="d-flex flex-column px-2 mx-2">
          <div className="anime-block pt-2">
            <span>
              <strong>Rating:</strong> {(score && score > 0)? score: 0}/10
            </span>
          </div>
          <div className="anime-block">
            <span>
              <strong>Episodes:</strong> {anime.episodes}
            </span>
          </div>
          <div className="anime-block">
            {anime.genres && (
              <span>
                <strong>Genre:</strong>{" "}
                {anime.genres.map((genre) => genre.name).join(", ")}
              </span>
            )}
          </div>
          <div className="my-3">
            <span>
              <strong>Synopsis</strong>
              <p className="anime-sypnosis-content">{anime.synopsis}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeContent;
