import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// //하나의 button rendering
// class Square extends React.Component {
//   //lifting state up 했으니깐 더이상 핉요 X
//   // constructor(props) {
//   //   super(props);
//   //   //state를 가짐 밑에 설정했던 value i가 null값으로 초기세팅
//   //   this.state = {
//   //     value: null,
//   //   };
//   // } 
//   **이제 Square components는 controlled componnets가 된 것!***
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()} 
//       //onClick을 상위 컴포넌트에서 props으로 받아서 사용
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
//In React, function components are a simpler way to write components 
//that only contain a render method and don’t have their own state. I
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}

//Board Component에 9개의 Squre rendering
class Board extends React.Component {
  //lifting state up from Square component
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    //why slice? immutable
    //1. Avoiding direct data mutation lets us keep previous versions 
    //of the game’s history intact, and reuse them later.
    //2. Detecting changes in immutable objects is considerably easier
    //3. it helps you build pure components in React. Immutable data can easily determine 
    //if changes have been made which helps to determine when a component requires re-rendering.
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares: squares,
      xIsNext: !this.state.xIsNext,

    });
  }

  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]}
    onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
//1개의 Board를 rendering
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
