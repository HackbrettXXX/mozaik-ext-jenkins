import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import styled from 'styled-components';
import {darken} from 'polished';

const BuildNumber = styled.span`
color: ${props => darken(20, props.theme.colors.text)};
margin-right: 7px;
`;

const Job = styled.div`
position: relative;
padding: 7px 15px 7px 35px;

&:before {
  content: " ";
  display: block;
  width:  12px;
  height: 12px;
  position: absolute;
  top:  14px;
  left: 12px;
  border-radius: 100%;
  background-color: ${props => props.theme.colors(props.job.lastBuild ? props.job.lastBuild.result.toLowerCase() : 'unknown')};
}
`;

class JobItem extends Component {
    render() {
        const { job } = this.props;

        let buildNumber = <span>—</span>;
        let statusIcon  = <i className="fa fa-question-circle" />;  // eslint-disable-line no-unused-vars
        let fromNow     = <time>—</time>;

        if (job.lastBuild) {
            buildNumber = (
                <BuildNumber>
                    #{job.lastBuild.number}
                </BuildNumber>
            );

            if (job.lastBuild.result === 'SUCCESS') {
                statusIcon = <i className="fa fa-check-circle" />;
            } else if (job.lastBuild.result === 'FAILURE') {
                statusIcon = <i className="fa fa-times-circle" />;
            } else if (job.lastBuild.result === 'ABORTED') {
                statusIcon = <i className="fa fa-minus-circle" />;
            }

            fromNow = <time>{moment(job.lastBuild.timestamp).fromNow()}</time>;
        }

        return (
            <Job>
                {job.name} {buildNumber}<br />
                {fromNow}
            </Job>
        );
    }
}

JobItem.displayName = 'JobItem';

export default JobItem;
