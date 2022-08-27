import React from 'react';

class Audio extends React.Component {
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
                <audio id={this.props.id} src={this.props.source} autoPlay onEnded={this.setEnded} />
            );
        }
    }

    setEnded() {
        console.log('fired');
        document.dispatchEvent(new CustomEvent('React-Clear'));
        this.setState((state, props) => {
            return { played: true };
        });
    }
}

export default Audio;