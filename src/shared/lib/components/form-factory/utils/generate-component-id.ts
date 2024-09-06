export const generateFormComponentId = (name: string, value: string, index?: number) => (index ? `${name}-${value}-${index}` : `${name}-${value}`);
