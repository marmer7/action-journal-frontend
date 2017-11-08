import React, { Component, PropTypes } from "react";
import ToolbarIcon from "../components/ToolbarIcon";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { icon: "a-unordered-list", style: "unordered-list-item" },
  { icon: "a-ordered-list", style: "ordered-list-item" },
  { icon: "a-quote", style: "blockquote" }
];

const SideToolbarExtras = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="toolbar side">
      <ul className="toolbar-icons">
        {BLOCK_TYPES.map(type => (
          <ToolbarIcon
            key={type.label || type.icon}
            active={type.style === blockType}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
        ))}
      </ul>
    </div>
  );
};

class SideToolbar extends Component {
  state = { isExpanded: false };

  render() {
    const { isExpanded } = this.state;
    const { editorState, onToggle } = this.props;
    return (
      <div style={this.props.style} className="side-toolbar">
        <i
          className="a-menu"
          onMouseEnter={() => this.setState({ isExpanded: true })}
          onMouseDown={e => e.preventDefault()}
          onMouseLeave={() => this.setState({ isExpanded: false })}
        >
          {isExpanded ? (
            <SideToolbarExtras editorState={editorState} onToggle={onToggle} />
          ) : null}
        </i>
      </div>
    );
  }
}

export default SideToolbar;
