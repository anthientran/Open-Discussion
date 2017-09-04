import React from 'react';
import { Pie } from 'react-chartjs-2';

export default class Chart extends React.Component {
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.props.data}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: '',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        
                    }}
                />
            </div>
        )
    }
}
