import React from 'react'

export default class Lifecycle extends React.Component {
  componentDidMount() {
    if(this.props.onMount) this.props.onMount(this);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: ', this)
    if(this.props.onUnMount) {
      this.props.onUnMount(this);
    }
  }
  
  render() {
    return null;
  }
}