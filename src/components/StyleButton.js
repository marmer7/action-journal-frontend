import React from "react";

export default class StyleButton extends React.Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = "editor-styleButton";
    if (this.props.active) {
      className += " editor-activeButton";
    }

    return (
      <span className={className} onClick={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
