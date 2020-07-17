import React from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";
import Loading from "./Loading";
import config from "../config";

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 1,
            totalPages: 0,
            loading: true,
            loadingError: false,
        }
    }

    fetchMovies = () => {
        fetch(`${config.apiUrl}&s=${this.props.searchString}&page=${this.state.page}`)
            .then(response => response.json())
            .then(response => {
                if (response.Response) {
                    this.setState({
                        movies: response.Search,
                        totalPages: Math.ceil(response.totalResults / config.moviesPerPage),
                        loading: false,
                    });
                }
                else {
                    this.setState({
                        movies: [],
                        totalPages: 0,
                        loading: false
                    });
                }
            })
            .catch(() => this.setState({
                loading: false,
                loadingError: true,
            }));
    }

    componentDidMount() {
        this.fetchMovies();
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchString != prevProps.searchString) {
            this.setState({
                page: 1,
                loading: true
            }, () => this.fetchMovies());
        }
    }

    handlePreviousPageClicked = () => {
        this.setState(state => ({
            page: state.page - 1,
            loading: true,
        }), () => this.fetchMovies());
    }

    handleNextPageClicked = () => {
        this.setState(state => ({
            page: state.page + 1,
            loading: true,
        }), () => this.fetchMovies());
    }

    render() {
        if (this.state.loading) return <Loading />;
        if (this.state.loadingError) return <h1>Something went wrong. Try again later.</h1>

        const movies = (this.state.movies)
            ? this.state.movies.map(movie => (
                <div key={movie.imdbID} className="col-12 col-md-6 col-lg-4 mb-3">
                    <Movie movie={movie} />
                </div>))
            : "Movies not found"

        const pagination = (this.state.movies)
            ? <div className="row">
                <div className="col">
                    <Pagination
                        page={this.state.page}
                        totalPages={this.state.totalPages}
                        handlePreviousPageClicked={this.handlePreviousPageClicked}
                        handleNextPageClicked={this.handleNextPageClicked}
                    />
                </div>
            </div>
            : null;

        return (
            <>
                {pagination}
                <div className="row mt-3 mb-3">
                    {movies}
                </div>
            </>
        );
    }
}