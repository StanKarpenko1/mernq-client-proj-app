const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = require ('graphql');
const Projects = require('../Models/Project')
const Clients = require('../Models/Client')


// client type
const ClientType = new GraphQLObjectType ({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    }),
});

// project type
const ProjectType = new GraphQLObjectType ({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve (parent, args) {
                return Clients.findById(parent.id)
            }
        }
    }),
});


const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
                return Clients.findById(args.id)
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve (parent, args) {
                return Clients.find()
            },
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
                return Projects.findById(args.id)
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve (parent, args) {
                return Projects.find()
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
