import React, { Component, PropTypes } from 'react';
import SliderApi from './slider-api';
import sanitizeProps from './sanitize-props';

export default class Slider extends Component {
  static childContextTypes = {
    getState: PropTypes.func,
    goTo: PropTypes.func,
    prev: PropTypes.func,
    next: PropTypes.func,
    listen: PropTypes.func,
    updateSlides: PropTypes.func
  }

  componentDidMount() {
    var container = this.refs.container;
    this.api.updateContainer(container.offsetWidth, container.offsetHeight);
  }

  buildNewApi() {
    return new SliderApi(this.props);
  }

  getChildContext() {
    if (!this.api) {
      this.api = this.buildNewApi()
    }

    return {
      getState: ::this.api.getState,
      listen: ::this.api.listen,
      prev: ::this.api.prev,
      next: ::this.api.next,
      goTo: ::this.api.goTo,
      updateSlides: ::this.api.updateSlides
    };
  }

  componentWillReceiveProps(nprops) {
    this.api.configure(nprops);
  }

  static propTypes = {
    // basic params
    infinite: PropTypes.bool,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    vertical: PropTypes.bool,
    transitionSpeed: PropTypes.number,
    transitionTimingFn: PropTypes.string,
    swipe: PropTypes.bool,
    draggable: PropTypes.bool,
    edgeFriction: PropTypes.number,
    touchThreshold: PropTypes.number,
    touchMove: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoPlaySpeed: PropTypes.number,

    // event handlers
    beforeChange: PropTypes.func,
    afterChange: PropTypes.func
  }

  static defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    vertical: false,
    transitionSpeed: 300,
    transitionTimingFn: 'linear',
    swipe: true,
    draggable: true,
    edgeFriction: 0.15,
    touchThreshold: 5,
    touchMove: true,
    autoPlay: false,
    autoPlaySpeed: 2000
  }

  render() {
    var divProps = sanitizeProps(this.props, Slider.propTypes);
    return (
      <div {...divProps} ref="container">
        {this.props.children}
      </div>
    )
  }
}