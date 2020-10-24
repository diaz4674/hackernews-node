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

		delete: (parent, args, context) => {
			const deletedLink = context.prisma.link.delete({
				where: { id: Number(args.id) },
			});

			return deletedLink;
		},
		update: (parent, args) => {
			const { id, data } = args;

			const link = prisma.link.update({
				where: { id: Number(id) },
				data,
			});

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
