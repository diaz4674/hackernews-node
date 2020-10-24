const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for GraphQL",
	},
];
let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `this is the api of a hacernews clone`,
		feed: () => links,
	},
	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			};
			links.push(link);
			return link;
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
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
