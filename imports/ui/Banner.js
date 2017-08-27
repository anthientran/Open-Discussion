import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner">
                <div className="banner__content">

                    <div className="ui grid">
                        <div className="eight wide column">
                            <h2>Discussion, Ideas, Innovation</h2>

                            <h4>This is a short description of what Haldeb Open Discussion is about. What does it do?
                                Bringing forward ideas, innovation from the citizens for the municipality of Halden
                            </h4>
                        </div>
                    </div>
                </div>
                <figure className="banner--image"></figure>
            </div>
        );
    }
}
