import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import { BarChart } from '@mozaik/ui';


class JobBuildsHistogram extends Component {
    constructor(props) {
        super(props);
    }

    static getApiRequest({job}) {
        return {
            id:     `jenkins.job.${ job }`,
            params: { job }
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
        const { job }    = this.props;
        const builds = this.getBuilds();

        // converts to format required by BarChart component
        const data = builds.map(build => ({
            x:      build.number,
            y:      build.duration / 1000 / 60, // converts ms to mn
            result: build.result ? build.result.toLowerCase() : 'unknown'
        }));

        const barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        d => `result--${ d.result }`
        };

        return (
            <div>
                <div className="widget__header">
                    Jenkins <span className="widget__header__subject">{job}</span> builds
                    <i className="fa fa-bug"/>
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

JobBuildsHistogram.displayName = 'JobBuildsHistogram';

JobBuildsHistogram.defaultProps = {
    cap: 50
};

export { JobBuildsHistogram as default };
