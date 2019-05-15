import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';
import {getBuildStatus} from './util';
import JobStatusPreviousBuild from './JobStatusPreviousBuild.jsx';
import {Widget, WidgetHeader, WidgetBody} from '@mozaik/ui';
import styled, {withTheme} from 'styled-components';
import {darken} from 'polished';
import '@fortawesome/fontawesome-free/css/all.css';

const Status = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
font-size: 15px;
width: 100%;
height: 100%;
text-align: center;

background-color: ${props => {
    const {builds} = props;
    if (builds.length > 0) {
        let buildStatus = getBuildStatus(builds[0]).toLowerCase();
        if (buildStatus === 'unstable') {
            buildStatus = 'warning';
        }
        return props.theme.colors[buildStatus.toLowerCase()];
    } else {
        return props.theme.colors.unknown;
    }
}}
`;

const JobStatusCurrent = styled.div`
color: ${props => props.theme.colors.textHighlight};
`;

const JobStatusCurrentStatus = styled.a`
font-size: 22px;
line-height: 22px;
font-weight: bold;
text-decoration: none !important;
`;

const JobStatusCurrentTime = styled.time`
font-size: 13px;
`;

const JobStatusCurrentStatus2 = styled.a`
font-size: 28px;
line-height: 32px;

color: ${props => {
    const {builds} = props;
    if (builds.length > 0) {
        return props.theme.colors[getBuildStatus(builds[0]).toLowerCase()];
    } else {
        return props.theme.colors.unknown;
    }
}}
`;

class JobStatus extends Component {
    constructor(props) {
        super(props);
    }

    static getApiRequest({ job, layout }) {
        return {
            id:     `jenkins.job.${job}`,
            params: { job, layout }
        };
    }

    getBuilds() {
        if (this.props.apiData) {
            return this.props.apiData.builds;
        } else {
            return [];
        }
    }


    render() {
        const { job, layout, title } = this.props;
        const builds                 = this.getBuilds();

        let currentNode  = null;
        let previousNode = null;
        let statusClasses;
        let iconClasses = 'fas fa-times';

        const finalTitle = title || `Jenkins job ${ job }`;

        if (layout === 'bold') {
            if (builds.length > 0) {
                const currentBuild = builds[0];
                if (currentBuild.result === 'SUCCESS' || currentBuild.result === 'UNSTABLE') {
                    iconClasses = 'fas fa-check';
                }

                currentNode = (
                    <JobStatusCurrent>
                        Build #{currentBuild.number}<br />
                        <JobStatusCurrentStatus href={currentBuild.url}>
                            {finalTitle}&nbsp;
                            <i className={iconClasses}/>
                        </JobStatusCurrentStatus><br/>
                        <JobStatusCurrentTime>
                            <i className="far fa-clock"/>&nbsp;
                            {moment(currentBuild.timestamp, 'x').fromNow()}
                        </JobStatusCurrentTime>
                    </JobStatusCurrent>
                );

            }

            return (
                <Widget>
                    <Status builds={builds}>{currentNode}</Status>
                </Widget>
            );
        }

        if (builds.length > 0) {
            const currentBuild = builds[0];
            if (currentBuild.result === 'SUCCESS') {
                iconClasses = 'fa fa-check';
            }

            currentNode = (
                <JobStatusCurrent>
                    Build #{currentBuild.number}<br />
                    <JobStatusCurrentStatus2 href={currentBuild.url}>
                        {currentBuild.result}&nbsp;
                        <i className={iconClasses} />
                    </JobStatusCurrentStatus2><br/>
                    <JobStatusCurrentTime>
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(currentBuild.timestamp, 'x').fromNow()}
                    </JobStatusCurrentTime>
                </JobStatusCurrent>
            );

            if (builds.length > 1) {
                previousNode = <JobStatusPreviousBuild build={builds[1]} />;
            }
        }

        return (
            <Widget>
                <WidgetHeader title={<span>{finalTitle}<i className="fa fa-bug" /></span>} />
                <WidgetBody>
                    {currentNode}
                    {previousNode}
                </WidgetBody>
            </Widget>
        );
    }
}

JobStatus.displayName = 'JobStatus';

JobStatus.defaultProps = {
    layout: 'default'
};

export default withTheme(JobStatus);
