import React from 'react';
import Header from './Header';

export default class Main extends React.Component {
    render() {
        return (
            <div>
               <Header />
               <div className="page-content">
                   {this.props.children}
               </div>
            </div>
        );
    }
}
