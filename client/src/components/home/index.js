/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "semantic-ui-react";
import Search from "../Search";

const Home = () => {

  return (
    <>
      <div
        className="ui vertical masthead center aligned segment"
        style={{ marginBottom: "10%", marginTop: "10%" }}
      >
        <div
          className="ui text container"
          style={{ marginTop: "70px", marginBottom: "30px" }}
        >
          <h1 className="ui header">Hoops Social</h1>
          <h4 className="ui sub header">
            Search for an NBA player and see their stats!
          </h4>
        </div>
        <Grid>
          <Grid.Column width={6} />
          <Grid.Column width={4}>
            <Search size={"huge"} />
          </Grid.Column>
          <Grid.Column width={6} />
        </Grid>
      </div>
    </>
  );
};

export default Home;
