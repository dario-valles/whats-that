/* eslint-disable no-console */
const store = require('../redux/store').createRedux();
const Actions = require('../redux/actions');

const gameModel = {
  addGame: (gameKey, totalRounds) => {
    // CREATEGAME
    try {
      store.dispatch(Actions.createGame(gameKey, totalRounds));
      return true;
    } catch (error) {
      console.error(error);
    }
  },

  gameExists: gameKey => {
    const state = store.getState();
    return state.games[gameKey] ? true : false;
  },

  getCurrentGameKey: playerId => {
    const state = store.getState();
    return state.players[playerId].gameKey;
  },
  getRoundStatus: gameKey => {
    const state = store.getState();
    return state.games[gameKey].round.roundStatus;
  },

  setRoundStatus: gameKey => {
    const state = store.getState();
    let currentStatus = state.games[gameKey].round.roundStatus;
    store.dispatch(Actions.setRoundStatus(gameKey, !currentStatus));
  },
  startRound: async (gameKey, word) => {
    // startGame
    try {
      const state = store.getState();
      let currentRound = state.games[gameKey].round.currentRound;
      currentRound++;
      store.dispatch(
        Actions.startRound({
          game: gameKey,
          round: {
            currentRound,
            word,
            roundStatus: true
          }
        })
      );
      return true;
    } catch (error) {
      console.error(error);
    }
  },

  getCurrentWord: gameKey => {
    try {
      const state = store.getState();
      return state.games[gameKey].round.word;
    } catch (error) {
      console.error(error);
    }
  },

  getCurrentRoundNumber: gameKey => {
    try {
      const state = store.getState();
      return state.games[gameKey].round.currentRound;
    } catch (error) {
      console.error(error);
    }
  },

  deleteGame: gameKey => {
    // DELETE_GAME
    try {
      const state = store.getState();
      if (state.games[gameKey]) {
        Actions.deleteGame(gameKey);
        return true;
      } else {
        throw 'gameDoesNotExist';
      }
    } catch (error) {
      console.error(error);
    }
  },

  addPlayer: (player, playerId) => {
    // players: {
    //   playerid1: {
    //     playerName: 'ShanShan',
    //     playerAvatar: 'http://avatarurl',
    //     roundWins: 0,
    //     isCreator: true,
    //     gameKey: 'dog-big',
    //     draws: []
    //   },
    try {
      const newPlayer = {
        playerId,
        playerName: player.playerName,
        playerAvatar: player.playerAvatar,
        isCreator: false,
        gameKey: '',
        draws: []
      };
      store.dispatch(Actions.addPlayer(newPlayer));
      return true;
    } catch (error) {
      console.error(error);
      throw 'playerDoesNotExist';
    }
  },

  addPlayerToGame: async (playerId, gameKey, isCreator = false) => {
    try {
      const playerToGame = {
        playerId,
        isCreator,
        gameKey
      };
      store.dispatch(Actions.addPlayerToGame(playerToGame));
    } catch (error) {
      console.error(error);
    }
  },

  playerExist: async playerId => {
    try {
      const state = store.getState();
      return state.players[playerId] ? true : false;
    } catch (error) {
      console.error(error);
    }
  },

  addDrawToPlayer: playerId => {
    playerId;
  },

  playerWinRound: playerId => {
    //SET_PLAYER_ROUND_WINS
    playerId;
  },

  getPlayersFromGame: async gameKey => {
    // DARIO
    const state = store.getState();
    const playersId = state.games[gameKey].players;
    const players = [];

    playersId.forEach(playerId => {
      players.push({
        [playerId]: {
          playerName: state.players[playerId].playerName,
          playerAvatar: state.players[playerId].playerAvatar,
          playerId
        }
      });
    });
    return players;
  },

  getImagesFromRound: async (gameKey, roundNumber) => {
    // DARIO
    const state = store.getState();
    const players = state.games[gameKey].players;
    const imagesFromRound = [];
    roundNumber;

    players.forEach(player => {
      player;
      // lastRound
      //   ? imagesFromRound.push(store.players[player].draws)
      //   : imagesFromRound.push(store.players[player].draws[roundNumber - 1]);
    });

    return imagesFromRound;
  },

  getImagesFromGame: gameKey => {
    gameKey;
  }
};

module.exports = gameModel;
