module.exports = {
    pluginOptions: {
        lintStyleOnBuild: false,
        stylelint: {},
    },

    runtimeCompiler: true,

    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/common-styles/colors.scss";',
            },
        },
    },
};
