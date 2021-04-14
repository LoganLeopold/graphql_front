import { useQuery, gql } from '@apollo/client';

const ApolloTest = (props) => {

    const allActors = gql`
        query actorMany {
            actorMany {
            Name,
            _id
            }
        }
    `

    const { loading, error, data } = useQuery(allActors);

    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }

    console.log(data)
    return data.actorMany.map( actor => {
        return <p key={actor.Name}>{actor.Name}</p>
    })

}

export default ApolloTest