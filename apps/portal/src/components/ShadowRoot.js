import {Component} from 'react';
import {createPortal} from 'react-dom';

export default class ShadowRoot extends Component {
    static isSupported() {
        return (
            typeof window !== 'undefined' &&
            window.Element &&
            window.Element.prototype.hasOwnProperty('attachShadow')
        );
    }

    constructor(props) {
        super(props);
        this.state = { ready: false };
    }

    componentDidMount() {
        this.shadowRoot = this.node.attachShadow({
            mode: 'open',
        });

        this.setState({ ready: true });
    }

    render() {
        const {
            children,
            head,
            style = {},
            dataTestId = '',
            ...rest
        } = this.props;
        return (
            <div
                data-testid={dataTestId}
                ref={(node) => (this.node = node)}
                style={style}
                {...rest}
            >
                {this.state.ready &&
                    createPortal(
                        <>
                            {head}
                            {children}
                        </>,
                        this.shadowRoot
                    )}
            </div>
        );
    }
}
