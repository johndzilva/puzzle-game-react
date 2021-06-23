import "./App.css";
import logoA from "./images/superman.png";
import logoB from "./images/bmw.png";
import logoC from "./images/aave.png";
import logoD from "./images/instagram.png";
import logoE from "./images/audi.png";
import logoF from "./images/batman.png";

import GameInfo from "./components/GameInfo/GameInfo";
import Card from "./components/Card/Card";
import { Component } from "react";

var interval;
var firstCardIndex, firstCard, secondCardIndex, secondCard;
var flipped = false;
// var flipTheCard = true;
var lockCard = false;
var pairs = 0;

//Fisher-Yates (aka Knuth) shuffle algorithm
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      logos: [
        logoA,
        logoB,
        logoC,
        logoD,
        logoE,
        logoF,
        logoA,
        logoB,
        logoC,
        logoD,
        logoE,
        logoF,
      ],
      active: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      eventFlip: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      minutes: 0,
      seconds: 0,
      moves: 0,
    };
    shuffle(this.state.logos);
  }

  runTimer = () => {
    interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
      if (this.state.seconds === 60) {
        this.setState({ minutes: this.state.minutes + 1 });
        this.setState({ seconds: 0 });
      }
    }, 1000);
  };

  countMoves = () => {
    this.setState({
      moves: this.state.moves + 1,
    });
    //ERROR console.log('moves', this.state.moves)
    if (this.state.moves === 1) this.runTimer();
  };

  toggleState = (index) => {
    if (this.state.eventFlip[index]) {
      const newActive = [...this.state.active]; // Clone the array
      newActive[index] = !newActive[index]; // Invert true or false
      this.setState({
        active: newActive, // Set the new array to state
      });
    }
  };

  disableCards = (firstCardIndex, secondCardIndex) => {
    const newActive = [...this.state.active]; // Clone the array
    newActive[firstCardIndex] = !newActive[firstCardIndex]; // Invert true or false
    newActive[secondCardIndex] = !newActive[secondCardIndex]; // Invert true or false
    this.setState({
      eventFlip: newActive, // Set the new array to state
    });
  };

  unflipCards = (firstCardIndex, secondCardIndex) => {
    const newActive = [...this.state.active]; // Clone the array
    newActive[firstCardIndex] = !newActive[firstCardIndex]; // Invert true or false
    newActive[secondCardIndex] = !newActive[secondCardIndex]; // Invert true or false
    this.setState({
      active: newActive, // Set the new array to state
    });
  };

  checkCard = (firstCardIndex, firstCard, secondCardIndex, secondCard) => {
    var isTrue =
      firstCard.state.logos[firstCardIndex] ===
      secondCard.state.logos[secondCardIndex];
    console.log(isTrue);
    isTrue
      ? this.disableCards(firstCardIndex, secondCardIndex)
      : this.unflipCards(firstCardIndex, secondCardIndex);
  };

  cardFlip = (index) => {
    debugger;
    console.log("index:", index);
    if (lockCard) return;
    if (index === firstCardIndex) return;

    this.toggleState(index);
    this.countMoves();

    if (!flipped) {
      firstCardIndex = index;
      firstCard = this;
      console.log(this);
      flipped = true;
      return;
    }

    secondCard = this;
    secondCardIndex = index;
    lockCard = true;
    this.checkCard(firstCardIndex, firstCard, secondCardIndex, secondCard);
  };

  render() {
    return (
      <div className="App vh-100 flex flex-column justify-center items-center">
        <GameInfo
          noOfMoves={this.state.moves}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
        />
        <div className="Game">
          {this.state.logos.map((element, index) => {
            return (
              <Card
                key={index}
                flipClass={this.state.active[index] ? "flip" : null}
                logo={element}
                onCardClick={() => this.cardFlip(index)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
