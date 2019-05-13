import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

const TableCell = styled.td``;

const BuildStatus = styled.span`
font-size: 1.6em;
color: ${props => props.theme.colors[props.build.result.toLowerCase()]}
`;

class ViewJobBuildStatus extends Component {
    constructor(props) {
        super(props);
        
        props.build = {result: 'unknown'};
    }

    render() {
        const { build } = this.props;

        let iconClasses = 'fa fa-';
        switch (build.result) {
            case 'SUCCESS':
                iconClasses += 'check-circle';
                break;

            case 'FAILURE':
                iconClasses += 'warning';
                break;

            default:
                iconClasses += 'question-circle';
                break;
        }

        return (
            <TableCell>
                <BuildStatus>
                    <i className={iconClasses} />
                </BuildStatus>
            </TableCell>
        );
    }
}

ViewJobBuildStatus.displayName = 'ViewJobBuildStatus';

export default ViewJobBuildStatus;
