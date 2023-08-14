import {Component} from 'react';
import {createPortal} from 'react-dom';

export default class Frame extends Component {
    constructor(props) {
        super(props);

        this.srcUrl = URL.createObjectURL(new Blob(
            ['<!DOCTYPE html><html><head></head><body></body></html>'],
            { type: 'text/html'}
        ));
    }

    componentDidMount() {
        this.node.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setupFrameBaseStyle();
    };

    componentWillUnmout() {
        this.node.removeEventListener('load', this.handleLoad);
        URL.revokeObjectURL(this.srcUrl);
    }

    setupFrameBaseStyle() {
        if (this.node.contentDocument) {
            this.iframeHtml = this.node.contentDocument.documentElement;
            this.iframeHead = this.node.contentDocument.head;
            this.iframeRoot = this.node.contentDocument.body;
            this.forceUpdate();
        }
    }

    render() {
        const {children, head, title = '', style = {}, dataTestId = '', ...rest} = this.props;
        return (
            <iframe
                src={this.srcUrl}
                data-testid={dataTestId}
                ref={node => (this.node = node)}
                title={title}
                style={style} frameBorder="0"
                {...rest}
            >
                {this.iframeHead && createPortal(head, this.iframeHead)}
                {this.iframeRoot && createPortal(children, this.iframeRoot)}
            </iframe>
        );
    }
}
