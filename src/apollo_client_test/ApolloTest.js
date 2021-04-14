import { useQuery, gql } from '@apollo/client';

const ApolloTest = (props) => {

    const allActors = gql`
        query{
            actorMany {
            Name,
            _id
            }
        }
    `

    const { loading, error, data } = useQuery(allActors);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

}

export default ApolloTest