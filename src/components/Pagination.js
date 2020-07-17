import React from "react";

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={this.props.page == 1}
                        onClick={this.props.handlePreviousPageClicked}>
                        {'<'}
                    </button>
                    <span className="ml-2 mr-2">Page {this.props.page}</span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={this.props.page == this.props.totalPages}
                        onClick={this.props.handleNextPageClicked}>
                        {'>'}
                    </button>
                </div>
            </div>
        )
    }
}