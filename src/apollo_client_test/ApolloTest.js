import { useQuery, gql } from '@apollo/client';

const ApolloTest = (props) => {

    // const allActors = gql`
    //     query actorMany {
    //         actorMany {
    //         Name,
    //         _id
    //         }
    //     }
    // `
    const test = "Matthew Damon"

    const allActors = gql`
        mutation {
            actorUpdateOne(filter:{_id:"606b4a0f86b9b68d59f576e5"}, record:{Name:"${test}"}) {
            recordId
            }
        }
    `

    const { loading, error, data } = useQuery(allActors);

    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }

    return data.actorMany.map( actor => {
        return <p key={actor.Name}>{actor.Name}</p>
    })

}

export default ApolloTest