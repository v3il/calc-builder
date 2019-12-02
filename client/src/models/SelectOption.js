export default class SelectOption {
    constructor({
        activatedValue = 100,
        deactivatedValue = 0,
        isSelected = false,
        label = 'Новая опция',
        id = Math.random(),
    } = {}) {
        this.activatedValue = activatedValue;
        this.deactivatedValue = deactivatedValue;
        this.isSelected = isSelected;
        this.label = label;
        this.id = id;
    }
}
