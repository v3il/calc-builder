import ContainerAlignmentPositions from '../constants/ContainerAlignmentPositions';
import ContainerSizes from '../constants/ContainerSizes';

export default class LayoutContainer {
    constructor(id) {
        this.id = id;

        this.fields = [];
        this.float = true;

        this.width = ContainerSizes.default;
        this.alignment = ContainerAlignmentPositions.default;
    }
}