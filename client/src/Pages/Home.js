import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    isLoggedIn: false
  };
  componentDidMount() {
    let check = localStorage.getItem("token");
    if (check !== "") {
      this.setState({ isLoggedIn: true });
    }
  }
  render() {
    return (
      <section className="define">
        <h2>Find the work that suits you</h2>
        <h2>Or get your tasks done</h2>
        <p>
          <br />
          Carry out the jobs posted and help others or get your own stuff done.
          Make and save money on the way.
          <br />
          <br />
        </p>
        <h3>We only serve Win-wins</h3>
        <h3 style={{ marginTop: "10px" }}>Have A job? Get it done here:</h3>
        <Link to="/postgig">Post A Gig</Link>
        <h3>Want to work? Look here:</h3>
        <Link to="/gigs">View Gigs</Link>
        {this.state.isLoggedIn ? (
          <Link id="logout" to="/logout">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/signup" id="left_hover">
              Sign Up
            </Link>
            <Link to="/login" id="right_hover">
              Log In
            </Link>
          </>
        )}
      </section>
    );
  }
}

export default Home;
