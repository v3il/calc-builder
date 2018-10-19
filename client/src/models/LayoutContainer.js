export default class LayoutContainer {
    constructor(options) {
        for(const option in options) {
            this[option] = options[option];
        }
    }
}