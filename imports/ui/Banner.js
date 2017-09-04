import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner">
                <div className="banner__content">

                    <div className="ui grid">
                        <div className="eight wide column">
                            <h2>Discussion, Ideas, Innovation</h2>

                            <h4>Halden Open Discussion is an open platform for citizens to discuss topics that matter to them.
                                It aims at bringing forward ideas, innovation from the citizens for the municipality of Halden.
                            </h4>

                            <h4>
                            People can raise their voice through voting and discussing with others while their privacy is respected.
                            </h4>
                        </div>
                    </div>
                </div>
                <figure className="banner--image"></figure>
            </div>
        );
    }
}
