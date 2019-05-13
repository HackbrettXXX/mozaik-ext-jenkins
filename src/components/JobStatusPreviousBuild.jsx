import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import { getBuildStatus }              from './util';
import styled from 'styled-components';
import {darken} from 'polished';

const JobStatusPrevious = styled.div`
position: absolute;
left: 0;
bottom: 10px;
height: 24px;
line-height: 24px;
padding: 0 15px;
font-size: 13px;
color: ${props => darken(20, props.theme.colors.text)};
`;

class JobStatusPreviousBuild extends Component {
    render() {
        const { build } = this.props;

        return (
            <JobStatusPrevious>
                previous status (#{build.number}) were&nbsp;
                {getBuildStatus(build)}&nbsp;
                {moment(build.timestamp, 'x').fromNow()}
            </JobStatusPrevious>
        );
    }
}

JobStatusPreviousBuild.displayName = 'JobStatusPreviousBuild';

export default JobStatusPreviousBuild;
