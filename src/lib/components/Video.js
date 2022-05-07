import React from 'react';

class Video extends React.Component {
    // called on first RenderDOM.render
    constructor(props) {
        super(props);
        this.state = {
            played: false
        };
        this.setEnded = this.setEnded.bind(this);
    }

    // called on subsequent RenderDOM.render
    componentWillReceiveProps(nextProps) {
        this.setState((state, props) => {
            return { played: false };
        });
    }

    componentDidMount() { };
    componentWillUnmount() { };

    render() {
        if (this.state.played) {
            document.dispatchEvent(new CustomEvent("Clear"));
            return (<div></div>);
        } else {
            document.dispatchEvent(new CustomEvent("Draw"));
            return (
                <video id={this.props.id} src={this.props.source} height={this.props.height} autoPlay onEnded={this.setEnded}/>
            );
        }
    }

    setEnded() {
        console.log('fired');
        this.setState((state, props) => {
            return { played: true };
        });
    }
}

export default Video;