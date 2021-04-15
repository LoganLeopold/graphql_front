import { useQuery, useMutation, gql } from '@apollo/client';

const ApolloTest = (props) => {

    // const allActors = gql`
    //     query actorMany {
    //         actorMany {
    //         Name,
    //         _id
    //         }
    //     }
    // `
    const test = "Matt Damon"

    const allActors = gql`
        mutation {
            actorUpdateById(_id:"606b4a0f86b9b68d59f576e5", record: {Name: "Matth Damon"}) {
            record {
                Name,
                _id
            }
          }
        }
    `

    const { loading, error, data } = useMutation(allActors);

    if (loading) {return <p>Loading...</p>;}
    else if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }

    console.log(data)
    return data.allActors.map( actor => {
        return <p key={actor.Name}>{actor.Name}</p>
    })

}

export default ApolloTest