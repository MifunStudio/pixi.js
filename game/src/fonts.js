export function makeFontStyle(size, color) {
    size = size || '30px';
    color = color || '#FFFFFF';
    return {
        font : `bold ${size} Arial`,
        fill : color,
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6,
        wordWrap : true,
        wordWrapWidth : 440
    };
}
