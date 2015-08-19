import React from 'react';
import MenuMixin from './MenuMixin';
import assign from 'object-assign';
import {getKeyFromChildrenIndex} from './util';
import Animate from 'rc-animate';

const SubPopupMenu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDeselect: React.PropTypes.func,
    onOpenChange: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
    openTransitionName: React.PropTypes.string,
    openAnimation: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.object),
    openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    closeSubMenuOnMouseLeave: React.PropTypes.bool,
    visible: React.PropTypes.bool,
  },

  mixins: [MenuMixin],

  onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  },

  onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  },

  onClick(e) {
    this.props.onClick(e);
  },

  onOpenChange(e) {
    this.props.onOpenChange(e);
  },

  onDestroy(key) {
    this.props.onDestroy(key);
  },

  onItemHover(e) {
    this.onCommonItemHover(e);
  },

  getOpenTransitionName() {
    return this.props.openTransitionName;
  },

  renderMenuItem(c, i) {
    const props = this.props;
    const key = getKeyFromChildrenIndex(c, props.eventKey, i);
    const extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      open: props.openKeys.indexOf(key) !== -1,
      selected: props.selectedKeys.indexOf(key) !== -1,
      openSubMenuOnMouseEnter: true,
    };
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render() {
    this.haveOpened = this.haveOpened || this.props.visible;
    if (!this.haveOpened) {
      return null;
    }
    const props = assign({}, this.props);
    props.className += ` ${props.prefixCls}-sub`;
    const animProps = {};
    if (props.openTransitionName) {
      animProps.transitionName = props.openTransitionName;
    } else if (typeof props.openAnimation === 'object') {
      animProps.animation = props.openAnimation;
    }
    return (<Animate {...animProps}
      showProp="data-visible"
      component=""
      animateMount={true}>
      {this.renderRoot(props)}
    </Animate>);
  },
});

export default SubPopupMenu;