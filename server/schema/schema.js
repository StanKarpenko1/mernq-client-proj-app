const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require ('graphql');
const Projects = require('../Models/Project')
const Clients = require('../Models/Client');
const Client = require('../Models/Client');


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

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add client
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve (parents, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            }
        },
        // delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve (parent, args) {
                return Client.findByIdAndDelete(args.id)
            }
        },
        // add a project
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'},

                        }
                    }),
                    defaultValue: 'new',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve (parents, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
