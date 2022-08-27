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

    componentDidMount() { };
    componentWillUnmount() { };

    render() {
        if (this.state.played) {
            return (<div></div>);
        } else {
            return (
                <video id={this.props.id} src={this.props.source} height={this.props.height} autoPlay onEnded={this.setEnded}/>
            );
        }
    }

    setEnded() {
        console.log('fired');
        document.dispatchEvent(new CustomEvent("Clear"));
        this.setState((state, props) => {
            return { played: true };
        });
    }
}

export default Video;