import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import JobItem from './JobItem.jsx';
import {Widget, WidgetHeader, WidgetBody} from '@mozaik/ui';


class Jobs extends Component {
    constructor(props) {
        super(props);
    }

    static getApiRequest() {
        return { id: 'jenkins.jobs' };
    }

    getJobs() {
        if (this.props.apiData) {
            return this.props.apiData.jobs;
        } else {
            return [];
        }
    }

    render() {
        const jobs = this.getJobs();

        return (
            <Widget>
                <WidgetHeader title={<span>Jenkins jobs<span>{jobs.length}</span><i className="fa fa-bug" /></span>} />
                <WidgetBody>
                    {jobs.map((job, index) => (
                        <JobItem key={index} job={job} />
                    ))}
                </WidgetBody>
            </Widget>
        );
    }
}

Jobs.displayName = 'Jobs';

export default Jobs;
