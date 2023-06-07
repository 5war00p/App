import React from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import getComponentDisplayName from '../libs/getComponentDisplayName';
import ONYXKEYS from '../ONYXKEYS';
import reportActionPropTypes from '../pages/home/report/reportActionPropTypes';
import reportPropTypes from '../pages/reportPropTypes';

const withParentReportActionPropTypes = {
    parentReportAction: PropTypes.shape(reportActionPropTypes),
};

const withParentReportActionDefaultProps = {
    parentReportAction: {},
};

export default function (WrappedComponent) {
    const propTypes = {
        forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.instanceOf(React.Component)})]),

        /** All report actions for the parent report */
        parentReportActions: PropTypes.objectOf(PropTypes.shape(reportActionPropTypes)),

        /** The report currently being looked at */
        report: reportPropTypes,
    };
    const defaultProps = {
        forwardedRef: undefined,
        report: {},
        parentReportActions: {},
    };

    const WithParentReportAction = (props) => {
        const parentReportActionID = props.report && props.report.parentReportActionID ? props.report.parentReportActionID : {};
        const parentReportAction = props.parentReportActions[parentReportActionID] || {};

        return (
            <WrappedComponent
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                ref={props.forwardedRef}
                parentReportAction={parentReportAction}
            />
        );
    };

    WithParentReportAction.displayName = `WithParentReportAction(${getComponentDisplayName(WrappedComponent)})`;
    WithParentReportAction.propTypes = propTypes;

    WithParentReportAction.defaultProps = defaultProps;

    const withParentReportAction = React.forwardRef((props, ref) => (
        <WithParentReportAction
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            forwardedRef={ref}
        />
    ));

    return withOnyx({
        parentReportActions: {
            // default to current report if not a thread
            key: ({report}) => `${ONYXKEYS.COLLECTION.REPORT_ACTIONS}${report.parentReportID || report.reportID}`,
            canEvict: false,
        },
    })(withParentReportAction);
}

export {withParentReportActionPropTypes, withParentReportActionDefaultProps};
