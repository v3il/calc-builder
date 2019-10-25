module.exports = {
    runtimeCompiler: true,

    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/common-styles/colors.scss";`
            }
        }
    }
};
