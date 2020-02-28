import React from "react";
import axios from "axios";
import "../styles/viewgigs.css";

class ViewGig extends React.Component {
  state = {
    gig: {
      title: "",
      desc: "",
      offer: "",
      _id: "",
      deadline: "",
      negotiable: "",
      userId: ""
    }
  };
  componentDidMount() {
    // const { gigID } = this.props.location.state;
    let hash = this.props.location.hash;
    let gigID = hash.split("#")[1];
    axios
      .post("//localhost:3000/gigs/getOne", { gigID })
      .then(res => {
        console.log(res.data);
        this.setState({ gig: res.data.gig });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAccept = e => {
    let hash = this.props.location.hash;
    let gigID = hash.split("#")[1];
    let gig = {
      userTid: localStorage.getItem("userID"),
      gigID
    };
    axios
      .post("//localhost:3000/gigs/acceptGig", gig)
      .then(res => {
        if (res.data.success) {
          this.props.history.push("/gigs");
        } else {
          this.props.history.push("/gigs");
        }
      })
      .catch(err => {
        this.props.history.push("/gigs");
      });
  };

  render() {
    const { gig } = this.state;
    return (
      <section id="view-gig">
        {
          <div key={gig._id} id="gig-card">
            <h2 id="title">{gig.title}</h2>
            <p>
              <span>Description:</span> {gig.desc}
            </p>
            <p>
              <span>Offer:</span>
              Rs.{gig.offer}
            </p>
            <p>
              <span>Negotiable:</span> {gig.negotiable ? "Yes" : "No"}
            </p>
            <p>
              <span>DeadLine:</span> {gig.deadline}
            </p>
            <button
              style={{ marginTop: "20px", marginBottom: "20px" }}
              className="btn"
              onClick={this.handleAccept}
            >
              Accept
            </button>
          </div>
        }
      </section>
    );
  }
}

export default ViewGig;
