import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import moment from 'moment';
import {getBuildStatus} from './util';
import compact from 'lodash/compact';
import {Widget, WidgetHeader, WidgetBody} from '@mozaik/ui';
import styled from 'styled-components';
import {darken} from 'polished';

const BodyColored = styled.div`
display: flex;
width: 100%;
height: 100%;
text-align: center;

font-size: 1.6em;
background-color: ${props => {
    const { currentBuild, previousBuild } = JobStatusProgress.getBuilds(props);
    const status = (currentBuild.building ? getBuildStatus(previousBuild) : getBuildStatus(currentBuild)).toLowerCase();
    return props.theme.colors[status];
}}
`;

const JobStatusCurrent = styled.div`
margin: 40px 0 0 50px;
`;

const JobStatusCurrentStatus = styled.a`
font-size: 28px;
line-height: 32px;
`;

const ProgressNumber = styled.span`
font-size: 70%;
`;

const ProgressBar = styled.div`
border: 0.25em solid $main-txt-color;
margin: 8px 0;
`;

const JobStatusCurrentTime = styled.time`
font-size: 13px:
color: ${props => darken(20, props.theme.colors.text)};
`;


class JobStatusProgress extends Component {

    constructor(props) {
        super(props);

        this.state = { previousBuild: {}, currentBuild: {} };
    }

    static getApiRequest({ job }) {
        return {
            id:     `jenkins.job.${job}`,
            params: { job }
        };
    }

    onApiData(builds) {
        const [currentBuild = {}, previousBuild = {}] = builds;
        this.setState({ currentBuild, previousBuild });
    }

    static getBuilds(props) {
        if (props.apiData) {
            let [currentBuild = {}, previousBuild = {}] = props.apiData.builds;
            return { currentBuild, previousBuild };
        } else {
            return { currentBuild: {}, previousBuild: {} };
        }
    }

    render() {
        const { job } = this.props;
        const { currentBuild, previousBuild } = JobStatusProgress.getBuilds(this.props);
        const currentStatus = getBuildStatus(currentBuild);
        const previousStatus = getBuildStatus(previousBuild);
        const title = this.props.title || `Jenkins job ${ job }`;

        const iconClassList = [
            'fa',
            currentStatus === 'SUCCESS' && 'fa-check',
            currentStatus === 'FAILURE' && 'fa-close',
            currentStatus === 'UNSTABLE' && 'fa-meh-o',
            currentBuild.building && 'fa-spin fa-cog',
        ];

        const progress = currentBuild.building ?
            ((Date.now() - currentBuild.timestamp) / currentBuild.estimatedDuration) * 100 : 100;

        const progressStyle = {
            border:          '1px solid #000',
            backgroundColor: 'red',
            width:           `${progress}%`
        };

        return (
            <Widget>
                <WidgetBody>
                    <BodyColored>
                        <JobStatusCurrent>
                            Build #{currentBuild.number}<br />
                            <JobStatusCurrentStatus href={currentBuild.url}>
                                {title}&nbsp;<br />
                                <i className={compact(iconClassList).join(' ')}/>&nbsp;
                                <ProgressNumber>
                                    {progress < 100 && `${Math.round(progress)}%`}
                                </ProgressNumber>
                            </JobStatusCurrentStatus>
                            {progress < 100 && <ProgressBar style={progressStyle}/>}
                            <JobStatusCurrentTime>
                                <i className="fa fa-clock-o"/>&nbsp;
                                {moment(currentBuild.timestamp, 'x').fromNow()}
                            </JobStatusCurrentTime>
                        </JobStatusCurrent>
                    </BodyColored>
                </WidgetBody>
            </Widget>
        );
    }
}

JobStatusProgress.displayName = 'JobStatusProgress';

export default JobStatusProgress;
