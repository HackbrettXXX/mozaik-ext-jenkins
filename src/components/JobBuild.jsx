import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import moment                          from 'moment';
import { getBuildStatus }              from './util';
import styled from 'styled-components';
import { darken } from 'polished';

const ListItem = styled.div``

const Time = styled.time`
font-size: 12px;
display: inline-block;
color: ${props => darken(20, props.theme.colors.text)};
`
class JobBuild extends Component {
    render() {
        const { build } = this.props;

        // const classes = `list__item list__item--with-status list__item--with-status--${ getBuildStatus(build).toLowerCase() }`;

        return (
            <ListItem>
                #{build.number} {getBuildStatus(build)}&nbsp;
                <Time>
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment(build.timestamp, 'x').fromNow()}
                </Time>
            </ListItem>
        );
    }
}

JobBuild.displayName = 'JobBuild';


export default JobBuild;
