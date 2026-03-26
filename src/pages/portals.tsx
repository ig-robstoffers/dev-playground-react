import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class Portals extends React.Component<any, any> {
    _mainRef: any;
    constructor(props: any) {
        super(props);
    }

    onMainRef = (ref: any) => {
        this._mainRef = ref;
        if (this._mainRef) {
            this.setState({});
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.onClick}>Render</button>
                <div ref={this.onMainRef}>
                
                </div>
                {
                    this._mainRef && ReactDOM.createPortal(<TestComponent key="somekey"/>, this._mainRef, "somekey")
                }
            </div>
        );
    }

    onClick = () => {
        this.setState({});
    }
}

class TestComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div>I'm a test component!</div>)
    }

    componentWillUnmount(): void {
        console.log("unmounting test component");
    }
}