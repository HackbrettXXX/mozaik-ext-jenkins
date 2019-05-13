import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import ViewJobs from './ViewJobs.jsx';
import {Widget, WidgetHeader, WidgetBody} from '@mozaik/ui';


class View extends Component {
    constructor(props) {
        super(props);
    }

    static getApiRequest({ view }) {
        return {
            id:     `jenkins.view.${view}`,
            params: { view }
        };
    }

    getView() {
        if (this.props.apiData) {
            return this.props.apiData.view;
        } else {
            return { view: null };
        }
    }

    render() {
        let titleNode = (
            <span>
                Jenkins <span className="widget__header__subject">{this.props.view}</span> view
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        let jobsNode = null;

        const view = this.getView();
        if (view) {
            jobsNode = <ViewJobs jobs={view.jobs} />;
        }

        return (
            <Widget>
                <WidgetHeader title={<span>{titleNode}<i className="fa fa-bug"/></span>}/>
                <WidgetBody>
                    {jobsNode}
                </WidgetBody>
            </Widget>
        );
    }
}

View.displayName = 'View';

export default View;
