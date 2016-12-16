import React, { Component, PropTypes } from 'react';
import s from './Button.module.less';
import SVGIcon from 'opuscapita-react-ui-svg/lib/SVGIcon';

export default
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getPaddingCompensationRule(contentPosition, svg, label, children) {
    if (svg && label && contentPosition === 'before') {
      return { paddingLeft: '8px' };
    }
    if (svg && label && contentPosition === 'after') {
      return { paddingRight: '8px' };
    }
    if (svg && !label && !children) {
      return { paddingLeft: '4px', paddingRight: '4px' }
    }
    return {};
  }

  render() {
    let {
      isActive,
      altContent,
      bgColor,
      color,
      className,
      children,
      disabled,
      disablePaddingCompensation,
      label,
      contentPosition,
      paper,
      style,
      tabIndex,
      svg,
      svgSize,
      ...restProps
    } = this.props;

    let paddingCompensationRule = (svg && !disablePaddingCompensation) ?
      this.getPaddingCompensationRule(contentPosition, svg, label, children) :
      {};

    let buttonStyle = {
      backgroundColor: bgColor,
      color: color,
      ...paddingCompensationRule,
      ...style
    };

    let icon = svg ? (
      <SVGIcon svg={svg} color={color} size={svgSize} />
    ) : null;

    let buttonChildren = (children || icon) ? (
      <div
        className={s.children}
        style={{ visibility: altContent ? 'hidden' : 'initial' }}
      >
        {icon}
        {children}
      </div>
    ) : null;

    let buttonDelimiter = (buttonChildren && label) ? (
      <div className={s.delimiter} />
    ) : null;

    // eslint-disable-next-line max-len
    let buttonClassName = `${className} ${s.button} ${disabled ? s.disabled : ''} ${paper ? s.paper : '' } ${isActive ? s['button--active'] : ''}`;

    return (
      <button
        { ...restProps }
        className={buttonClassName}
        style={buttonStyle}
        tabIndex={disabled ? '-1' : tabIndex}
        type="button"
      >
        <div
          className={s.content}
          style={{ flexDirection: contentPosition === 'before' ? 'row-reverse' : 'row' }}
        >
          <div
            className={s.label}
            style={{
              textAlign: contentPosition === 'before' ? 'right' : 'left',
              visibility: altContent ? 'hidden' : 'initial'
            }}
          >
            {label ? label : <div style={{ width: '0' }}>&nbsp;</div>}
          </div>
          {buttonDelimiter}
          {buttonChildren}
        </div>
        {(altContent && <div className={s.altContent}>{altContent}</div>) || null}
      </button>
    );
  }
}

Button.propTypes = {
  isActive: PropTypes.bool,
  altContent: PropTypes.node,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disablePaddingCompensation: PropTypes.bool,
  label: PropTypes.string,
  contentPosition: PropTypes.oneOf(['before', 'after']),
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  paper: PropTypes.bool,
  svg: PropTypes.string,
  svgSize: PropTypes.string
};

Button.defaultProps = {
  contentPosition: 'after',
  className: '',
  disablePaddingCompensation: false,
  paper: false,
  svgSize: '24px',
  style: {},
  tabIndex: 0
};
