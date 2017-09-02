import React from 'react';
import classNames from 'classnames';
import OpinionsList from './OpinionsList';
import { Options } from './../api/options';

export default class Discussion extends React.Component {
    state = {
        options: [],
        activeOption: null
    };

    componentDidMount() {
        const { topicId } = this.props;
        const options = Options.find({ forTopic: topicId }).fetch();

        this.setState({
            options,
            activeOption: options.length > 0 ? options[0]._id : null
        });
    }
    
    render() {
        return (
            <div>
                <h1>Discussion</h1>

                <div className="ui grid">
                    <div className="four wide column">
                        <div className="ui secondary vertical pointing menu">
                            {this.state.options.map(option => 
                                <a
                                    className={classNames("item", {"active": this.state.activeOption === option._id})}
                                    key={option._id}
                                    onClick={() => this.handleOptionClick(option._id)}
                                >
                                    {option.title}
                                </a>)
                            }
                        </div>
                    </div>
                    <div className="twelve wide stretched column">
                        <div className="ui segment">
                            <OpinionsList optionId={this.state.activeOption}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleOptionClick = (optionId) => {
        this.setState({
            activeOption: optionId
        });
    }
}
