import React, { Component } from "react";
import Card from "./card";
import Info from "./info";
import { getAnimes } from "../services/animeService";
import CircularSpinner from "./circularSpinner";
import "./card.css";

class CardContainer extends Component {
  state = {
    animes: [],
    loading: false,
  };
  async componentDidMount() {
    //console.log("test", props);
    this.setState({ loading: true });
    const { data } = await getAnimes();
    this.setState({ loading: false });
    try {
      this.setState({
        animes: Object.values(data).filter((anime) => anime.reviews.length > 0),
      });
      // console.log(this.state.animes);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { animes } = this.state;
    return (
      <>
        {this.state.loading ? (
          <CircularSpinner />
        ) : (
          <>
            <Info numberOfAnimes={animes.length} />
            <div className="card-container">
              {animes.map((anime) => (
                <Card key={anime._id} anime={anime} {...this.props} />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default CardContainer;
