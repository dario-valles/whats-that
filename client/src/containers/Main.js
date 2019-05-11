import React from "react";
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";

import styled from "styled-components";

import { connect } from "react-redux";
import * as Actions from "../redux/actions/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // eslint-disable-line

export const Main = props => {
  return (
    <Wrapper>
      <Container>
        <div>
          <Text>
            What&apos;s that?! The game where you draw and we try to guess what
            it is.
          </Text>
        </div>
        <div>
          <Link to="/create">
            <Button primary onClick={props.getGameKey}>
              Create
            </Button>
          </Link>
          <Link to="/join">
            <Button>Join</Button>
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.4rem;
  padding: 0 15vw;
  margin-bottom: 6vh;
`;
const mapStateToProps = state => ({
  getKey: state.getKey
});

const mapDispatchToProps = dispatch => ({
  getGameKey: () => dispatch(Actions.getKey())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
