import React from "react";
import { createGlobalStyle } from "styled-components";

// Router Setup
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; // eslint-disable-line

// Component & Container Imports
import ComponentsCatalogue from "./containers/ComponentsCatalogue";
import Create from "./containers/Create";
import Join from "./containers/Join";
import Lobby from "./containers/Lobby";
import Game from "./containers/Game";
import Results from "./containers/Results";
import BetweenRounds from "./containers/BetweenRounds";
import Main from "./containers/Main";

// Styling & Animations
import "./App.css";
import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const GlobalStyle = createGlobalStyle`
  body {
    .bg-pan-top{animation:bg-pan-top 8s both};
    background-color: #764ad7;
    @keyframes bg-pan-top{0%{background-position:50% 100%}100%{background-position:50% 0}};
    color: #ffffff;
    margin: 0;
    @import url("https://fonts.googleapis.com/css?family=Nunito:400,600");
    font-family: 'Nunito', sans-serif;
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`;

const App = () => (
  <Route
    render={({ location }) => (
      <>
        <GlobalStyle />

        <PoseGroup>
          <RouteContainer key={location.pathname}>
            <Switch location={location}>
              <Route exact path="/" component={Main} pathname="Main" />
              <Route path="/create" component={Create} pathname="Create" />
              <Route path="/join" component={Join} pathname="Join" />
              <Route
                path="/components"
                component={ComponentsCatalogue}
                pathname="ComponentsCatalogue"
              />
              <Route path="/lobby" component={Lobby} pathname="Lobby" />
              <Route path="/game" component={Game} pathname="Game" />
              <Route
                path="/between-rounds"
                component={BetweenRounds}
                pathname="BetweenRounds"
              />
              <Route path="/results" component={Results} pathname="Results" />
            </Switch>
          </RouteContainer>
        </PoseGroup>
      </>
    )}
  />
);

export default App;
