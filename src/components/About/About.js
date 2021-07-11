import Scrollbar from 'react-smooth-scrollbar';
import {React, Component} from 'react';

class About extends Component {
  state = {
    damping: 0.1,
    count: 20,
  };

  componentDidMount() {
    this.scrollbar = this.$container.scrollbar;
  }

  _randomItem() {
    const res = [];

    for (let i = 0; i < this.state.count; i++) {
      res.push(<div key={i}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>);
    }

    return res;
  }

  render() {
    return (
      <Scrollbar
        ref={c => this.$container = c}
        damping={this.state.damping}
        plugins={{
          overscroll: { damping: this.state.damping }
        }}
      >
        <img src="your_diary.jpg" />
        {this._randomItem()}
      </Scrollbar>
    );
  }
}

export default About;