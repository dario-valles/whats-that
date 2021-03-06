import React, { useState } from "react";

// Redux Imports
import { connect } from "react-redux";
import * as Actions from "../redux/actions/index";

// Component & Container Imports
import AvatarContainer from "../components/AvatarContainer";
import Button from "../components/Button";
import ButtonContainer from "../components/ButtonContainer";
import Form from "../components/Form";
import FormLabel from "../components/FormLabel";
import GameID from "../components/GameID";
import InputField from "../components/InputField";
import PlayerAvatar from "../components/PlayerAvatar";
import SpeechBubble from "../components/SpeechBubble";
import Wrapper from "../components/Wrapper";

// Util imports
import generateAvatarProps from "../utils/generateAvatarProps";

const Create = props => {
  const [playerName, setPlayerName] = useState("");
  const [userChoice, setUserChoice] = useState("");

  const handlePlayerName = event => {
    const value = event.target.value;
    setPlayerName(value);
  };

  const submitName = e => {
    e.preventDefault();

    props.connectGame(
      playerName,
      props.userAvatar,
      props.gameKey,
      "createGame"
    );
    props.history.push("/lobby");
  };

  const goBack = () => {
    props.history.goBack();
  };

  const refreshAvatar = e => {
    e.preventDefault();
    let props = generateAvatarProps();
    setUserChoice(props);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitName}>
        <FormLabel>Choose your look</FormLabel>
        <SpeechBubble inGame>Looking good!</SpeechBubble>
        <div>
          <AvatarContainer
            style={{ transform: "scale(2.5)", marginTop: "2vh" }}
          >
            <PlayerAvatar userChoice={userChoice} />
          </AvatarContainer>
        </div>
        <Button refresh type="" onClick={refreshAvatar}>
          <i className="fas fa-sync-alt" />
        </Button>
        <FormLabel>What&apos;s your name?</FormLabel>
        <InputField
          type="text"
          name="name"
          onChange={handlePlayerName}
          required
          maxLength="8"
        />

        <FormLabel>Game ID:</FormLabel>
        <GameID>{props.loading ? "Loading..." : props.gameKey}</GameID>

        <ButtonContainer>
          <Button primary formButton type="submit">
            Create
          </Button>
          <p className="small lightweight">or</p>
          <Button back marginBottom type="button" onClick={goBack}>
            Back
          </Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  userAvatar: state.currentUser.userAvatar,
  gameKey: state.pages.create.gameKey,
  loading: state.pages.create.loading
});

const mapDispatchToProps = { connectGame: Actions.connectGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
