const path = require('path');

module.exports = {
    entry: "./src/www/business/apps/navigation/menu/index.js", // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "src/www/lib"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "menu.js", // string
        // the filename template for entry chunks

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src/www/business")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
}
