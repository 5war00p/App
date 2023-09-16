import React from 'react';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import WaypointEditor from './WaypointEditor';
import ONYXKEYS from '../../ONYXKEYS';

const propTypes = {
    /** The transactionID of this request */
    transactionID: PropTypes.string,

    /** Route params */
    route: PropTypes.shape({
        params: PropTypes.shape({
            /** IOU type */
            iouType: PropTypes.string,

            /** Index of the waypoint being edited */
            waypointIndex: PropTypes.string,

            /** The report ID attached to the request (used when creating a request for a workspace) */
            reportID: PropTypes.string,
        }),
    }),
};

const defaultProps = {
    transactionID: '',
    route: {
        params: {
            iouType: '',
            waypointIndex: '',
            reportID: '',
        },
    },
};

// This component is responsible for grabbing the transactionID from the IOU key
// You can't use Onyx props in the withOnyx mapping, so we need to set up and access the transactionID here, and then pass it down so that WaypointEditor can subscribe to the transaction.
function NewDistanceRequestWaypointEditorPage({transactionID, route}) {
    return (
        <WaypointEditor
            transactionID={transactionID}
            route={route}
        />
    );
}

NewDistanceRequestWaypointEditorPage.displayName = 'NewDistanceRequestWaypointEditorPage';
NewDistanceRequestWaypointEditorPage.propTypes = propTypes;
NewDistanceRequestWaypointEditorPage.defaultProps = defaultProps;
export default withOnyx({
    transactionID: {key: ONYXKEYS.IOU, selector: (iou) => iou && iou.transactionID},
})(NewDistanceRequestWaypointEditorPage);
