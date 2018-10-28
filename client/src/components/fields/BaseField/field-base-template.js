export default `
    <div :style="{
        width: params.float ? params.width + '%' : '100%',
    }" class="field-wrapper">
    
        Template
    
        <FieldsParamsToolbar />

        <div :style="{
            width: params.float ? '100%' : params.width + '%',
            'margin-left': params.float ? '0' : params.marginLeft + '%',
        }">
            <slot></slot>
        </div>
    </div>
`;