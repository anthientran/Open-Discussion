import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class TopicItem extends React.Component {
    render() {
        return (
            <Link className="ui card raised link" to={`topics/${this.props._id}/voting`}>
                <div className="content">
                    <div className="header">
                        {this.props.name}
                    </div>
                    <div className="meta">2d ago</div>
                    
                </div>

                <div className="image">
                    <img src="http://placehold.it/600x300"/>
                </div>

                <div className="content">
                    <span className="right floated">
                        <i className="heart outline like icon"></i>
                        17 likes
                    </span>

                    <i className="comment icon"></i>
                    3 comments
                </div>
            </Link>
        );
    }
}

TopicItem.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
}