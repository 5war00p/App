import React from 'react';
import {View} from 'react-native';
import Lottie from 'lottie-react-native';
import lodashGet from 'lodash/get';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import ONYXKEYS from '../../../ONYXKEYS';
import RoomHeaderAvatars from '../../../components/RoomHeaderAvatars';
import ReportWelcomeText from '../../../components/ReportWelcomeText';
import participantPropTypes from '../../../components/participantPropTypes';
import * as ReportUtils from '../../../libs/ReportUtils';
import styles from '../../../styles/styles';
import OfflineWithFeedback from '../../../components/OfflineWithFeedback';
import * as Report from '../../../libs/actions/Report';
import reportPropTypes from '../../reportPropTypes';
import EmptyStateBackgroundImage from '../../../../assets/animations/Report_Empty_State_BG_WIDE_dark.json';
import * as StyleUtils from '../../../styles/StyleUtils';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../components/withWindowDimensions';
import compose from '../../../libs/compose';
import withLocalize from '../../../components/withLocalize';
import PressableWithoutFeedback from '../../../components/Pressable/PressableWithoutFeedback';
import SignInGradient from '../../../../assets/images/home-fade-gradient--mobile.svg';

const propTypes = {
    /** The id of the report */
    reportID: PropTypes.string.isRequired,

    /** The report currently being looked at */
    report: reportPropTypes,

    /** Personal details of all the users */
    personalDetails: PropTypes.objectOf(participantPropTypes),

    ...windowDimensionsPropTypes,
};
const defaultProps = {
    report: {},
    personalDetails: {},
};

const ReportActionItemCreated = (props) => {
    if (!ReportUtils.isChatReport(props.report)) {
        return null;
    }

    const icons = ReportUtils.getIcons(props.report, props.personalDetails);

    return (
        <OfflineWithFeedback
            pendingAction={lodashGet(props.report, 'pendingFields.addWorkspaceRoom') || lodashGet(props.report, 'pendingFields.createChat')}
            errors={lodashGet(props.report, 'errorFields.addWorkspaceRoom') || lodashGet(props.report, 'errorFields.createChat')}
            errorRowStyles={[styles.ml10, styles.mr2]}
            onClose={() => Report.navigateToConciergeChatAndDeleteReport(props.report.reportID)}
        >
            <View style={StyleUtils.getReportWelcomeContainerStyle(props.isSmallScreenWidth)}>
                <Lottie
                    pointerEvents="none"
                    source={EmptyStateBackgroundImage}
                    autoPlay
                    loop
                    style={StyleUtils.getReportWelcomeBackgroundImageStyle(props.isSmallScreenWidth)}
                />
                <View style={[styles.t0, styles.l0, styles.h100, styles.pAbsolute, styles.signInPageGradient]}>
                    <SignInGradient
                        height="100%"
                        preserveAspectRatio="none"
                    />
                </View>
                <View
                    accessibilityLabel={props.translate('accessibilityHints.chatWelcomeMessage')}
                    style={[styles.p5, StyleUtils.getReportWelcomeTopMarginStyle(props.isSmallScreenWidth)]}
                >
                    <PressableWithoutFeedback
                        onPress={() => ReportUtils.navigateToDetailsPage(props.report)}
                        style={[styles.ph5, styles.pb3, styles.alignSelfStart]}
                        accessibilityLabel={props.translate('common.details')}
                        accessibilityRole="button"
                    >
                        <RoomHeaderAvatars icons={icons} />
                    </PressableWithoutFeedback>
                    <View style={[styles.ph5]}>
                        <ReportWelcomeText report={props.report} />
                    </View>
                </View>
            </View>
        </OfflineWithFeedback>
    );
};

ReportActionItemCreated.defaultProps = defaultProps;
ReportActionItemCreated.propTypes = propTypes;
ReportActionItemCreated.displayName = 'ReportActionItemCreated';

export default compose(
    withWindowDimensions,
    withLocalize,
    withOnyx({
        report: {
            key: ({reportID}) => `${ONYXKEYS.COLLECTION.REPORT}${reportID}`,
        },
        personalDetails: {
            key: ONYXKEYS.PERSONAL_DETAILS,
        },
    }),
)(ReportActionItemCreated);
