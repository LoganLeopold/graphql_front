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
                    return (
                        <div>
                            <h1>{movie.Name}</h1>
                            <Link to={`/movie/${movie._id}`}>
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