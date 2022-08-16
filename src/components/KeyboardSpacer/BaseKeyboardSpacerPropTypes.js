import PropTypes from 'prop-types';

const propTypes = {
    /** Top Spacing is used when there requirement of additional height to view. */
    topSpacing: PropTypes.number,

    /** Callback to update the value of keyboard status along with keyboard height + top spacing. */
    onToggle: PropTypes.func,

    /** iOS uses LayoutAnimation.Types[event.easing]. */
    iOSAnimated: PropTypes.bool,

    /** Keyboard event as per platform specific and also for different event to show/hide keyboard https://reactnative.dev/docs/keyboard#addlistener */
    /** Pass event name for keyboardShow since iOS and android both has different event to show keyboard. */
    keyboardShowMethod: PropTypes.string,

    /** Pass event name for keyboardHide since iOS and android both has different event to hide keyboard. */
    keyboardHideMethod: PropTypes.string,
};

const defaultProps = {
    topSpacing: 0,
    onToggle: () => null,
    style: [],
    iOSAnimated: false,
};

export {propTypes, defaultProps};
