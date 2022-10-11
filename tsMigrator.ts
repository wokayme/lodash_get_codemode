import type {
    Transform
  } from 'jscodeshift';

const transform: Transform = (file, api, options) => {
    const j = api.jscodeshift;
    const rootSource = j(file.source);
      
    return rootSource.toSource();
}
      
export const parser = 'tsx'; 

export default transform;