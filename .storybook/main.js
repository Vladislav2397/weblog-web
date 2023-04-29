const path = require('path');

module.exports = {
    stories: [
        '../src/**/*.stories.ts',
    ],
    features: {
        babelModelV7: true,
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-designs',
    ],
    // staticDirs: ['../public/images'],
    webpackFinal: async (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, '../src/')
        config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js']

        config.module.rules.push({
            test: /\.pug$/,
            use: [
                {
                    loader: 'pug-bem-plain-loader',
                    options: {
                        b: true, // default 'b-'
                        e: '__',
                        m: '--'
                    }
                }
            ],
        })
        config.module.rules.push({
            test: /\.scss$/,
            sideEffects: true,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        data: '@import "~@/app/styles/utility/utils-storybook.scss";',
                    },
                },
            ],
        })
        return config
    },
}
