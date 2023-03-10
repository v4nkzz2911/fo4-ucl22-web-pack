import React from 'react'

class Spinner extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        switch (this.props.type) {
            case 'circle':
                return ( <
                    div className = "spinner" >
                    <
                    div className = "double-bounce1" > < /div> <
                    div className = "double-bounce2" > < /div> <
                    /div>
                )
                break;
            case 'dot':
                return ( <
                    div className = "spinner-dot" >
                    <
                    div className = "bounce1" > < /div> <
                    div className = "bounce2" > < /div> <
                    div className = "bounce3" > < /div> <
                    /div>
                )
            default:
                return ( <
                    div className = "spinner-dot" >
                    <
                    div className = "bounce1" > < /div> <
                    div className = "bounce2" > < /div> <
                    div className = "bounce3" > < /div> <
                    /div>
                )
        }
    }
}

export default Spinner