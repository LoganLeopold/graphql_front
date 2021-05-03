import { useMutation, gql } from '@apollo/client';

const ApolloTest = (props) => {

    // const test = "Matt Damon"

    const allActors = gql`
        mutation {
            actorUpdateById(_id:"606b4a0f86b9b68d59f576e5", record: {Name: "Matt Damon"}) {
                record {
                    Name,
                    _id
                }
            }
        }
    `

    const [addTodo, { data }] = useMutation(allActors, {update: result});

    addTodo()

    function result () {
            console.log(data)
            return <h1> NOTHING </h1>
        // }
    }

    return <h1> NOTHING NATURAL </h1>

}

export default ApolloTest