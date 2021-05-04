import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const MovieList = (props) => {

    const allMovies = gql`
        query {
            movieMany {
                _id
                Name
            }
        }
    `

    const { loading, error, data } = useQuery(allMovies)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div>
            {
                data.movieMany.map( movie => {
                    // let directors = movie.Director.map( dir => <h3>{dir}</h3>)
                    return (
                        <div>
                            <h1>{movie.Name}</h1>
                            <label>Director(s)</label>
                            {/* <ul>{directors}</ul> */}
                            <Link to={`/movie/update/${movie._id}`}>
                                <button>Update Movie</button>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default MovieList