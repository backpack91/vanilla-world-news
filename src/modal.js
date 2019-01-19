import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './modal.css';

const modalRoot = document.getElementById('modalRoot');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
}

  // componentDidMount() {
  //   modalRoot.appendChild(this.el);
  // }
  //
  // componentWillUnmount() {
  //   modalRoot.removeChild(this.el);
  // }

  render () {
    return (
      this.props.children
    );
  }
}

export default Modal;
