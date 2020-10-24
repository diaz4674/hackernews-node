const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
	Query: {
		info: () => `this is the api of a hacernews clone`,
		feed: async (parent, args, context) => {
			return context.prisma.link.findMany();
		},
	},
	Mutation: {
		post: (parent, args, context) => {
			const newLink = context.prisma.link.create({
				data: {
					description: args.description,
					url: args.url,
				},
			});

			return newLink;
		},

		delete: (parent, args) => {
			const postIndex = links.findIndex((link) => {
				if (link.id === args.id) {
					return true;
				}
			});

			if (postIndex === -1) {
				throw new Error("link not found");
			}

			const deletedLink = links.splice(postIndex, 1);

			return deletedLink[0];
		},
		update: (parent, args) => {
			const { id, data } = args;

			const link = links.find((link) => {
				return link.id === id;
			});

			if (!link) {
				throw new Error("unable to find link");
			}

			link.url = data.url;
			link.description = data.description;

			return link;
		},
	},
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: {
		prisma,
	},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
