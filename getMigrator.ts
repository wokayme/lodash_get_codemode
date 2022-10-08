import type {
  Transform,
  ClassProperty,
  Identifier,
  ObjectExpression,
  TSPropertySignature,
  CallExpression,
  ImportDeclaration,
  MemberExpression,
  FunctionDeclaration,
  ObjectPattern,
  Expression,
  OptionalMemberExpression,
} from 'jscodeshift';
import { types as recastTypes, } from 'recast';


const types = recastTypes.namedTypes;

const transform: Transform = (file, api, options) => {
    const j = api.jscodeshift;
    const rootSource = j(file.source);

    let componentName;

    rootSource.find(j.CallExpression, (test)=>{
      if(test.callee.type === "MemberExpression"){
        const isLodashObject = test.callee.object.type === "Identifier" && test.callee.object.name === "_";
        
        const isGetMethod = test.callee.property.type === "Identifier" && test.callee.property.name === "get";

        if(isGetMethod && isLodashObject){
          return true;
        }
      }
      
      return false;
    }).forEach((nodePath)=>{
      // console.log(nodePath.node.arguments);
      const [objectVal, path, defaultValue] = nodePath.node.arguments;

      console.log(path.type);
      if(path.type !== "StringLiteral" && path.type !== "ArrayExpression") {
        throw new Error('path is incorrect');
        
      }
      if(path.type === "ArrayExpression"){
        console.log(path.elements);
      }
      const pathInArray = path.type === "ArrayExpression" ? path.elements : path.value.split('.')

      if(!(objectVal.type === "Identifier" || objectVal.type === "CallExpression")){
        throw new Error('unknown parsing of object');
      }

      let resultNode: Identifier | CallExpression | OptionalMemberExpression = objectVal;;

      pathInArray.forEach((nextPath)=>{
        console.log('!!', nextPath);
        resultNode = j.optionalMemberExpression(resultNode, nextPath?.type === "StringLiteral" ? j.literal(nextPath.value): j.identifier(nextPath))
      })
      if(defaultValue){
        nodePath.replace(j.logicalExpression("||", resultNode, defaultValue as Identifier));
      }else{
        nodePath.replace(resultNode);
      }

      
      // nodePath.replace(j.optionalMemberExpression(objectVal, j.identifier('test')))
      // nodePath.insertAfter([objectVal]);
    })
    
    return rootSource.toSource();
  }
    
  // use the flow parser
  module.exports.parser = 'tsx'; 

  export default transform;