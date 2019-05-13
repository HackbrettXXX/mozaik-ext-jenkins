import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import JobBuild from './JobBuild.jsx';
import {Widget, WidgetHeader, WidgetBody} from '@mozaik/ui';


class JobBuilds extends Component {
    constructor(props) {
        super(props);
    }

    getApiRequest() {
        const { job } = this.props;

        return {
            id:     `jenkins.job.${job}`,
            params: { job }
        };
    }

    static getApiRequest({job}) {
        return { id: `jenkins.jobs${job}`, params: { job } };
    }

    getBuilds() {
        if (this.props.apiData) {
            return this.props.apiData.builds;
        } else {
            return [];
        }
    }

    render() {
        const builds = this.getBuilds();
        const { title }  = this.props;

        return (
            <Widget>
                <WidgetHeader title={<span>{title}<span>builds.length</span><i className="fa fa-bug" /></span>} />
                <WidgetBody>
                    {builds.map(build => (
                        <JobBuild key={build.number} build={build} />
                    ))}
                </WidgetBody>
            </Widget>
        );
    }
}

JobBuilds.displayName = 'JobBuilds';

JobBuilds.defaultProps = {
    title: 'Jenkins job builds'
};

export default JobBuilds;
