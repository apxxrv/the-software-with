# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity in a 'cms' folder within your project
npx sanity@latest init --create-project "The Software With" --dataset production --output-path cms

# Install required packages in your Next.js project
npm install next-sanity @sanity/image-url @portabletext/react
