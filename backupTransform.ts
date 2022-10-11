import type {
    Transform
  } from 'jscodeshift';

const transform: Transform = (file, api, options) => {
    const j = api.jscodeshift;
    const rootSource = j(file.source);

    const lodashGetUsage = rootSource.find(j.CallExpression, (callExpresionNode)=>{
      if(callExpresionNode.callee.type === "MemberExpression"){
        const isLodash = callExpresionNode.callee.object.type === "Identifier" && callExpresionNode.callee.object.name === "_";
        const isGetMethod = callExpresionNode.callee.property.type === "Identifier" && callExpresionNode.callee.property.name === "get";
        return isLodash && isGetMethod;
      }
      return false;
    })

    lodashGetUsage.forEach((nodeAstPath)=>{
      const [object, membersPath, defaultValue] = nodeAstPath.node.arguments;

      if(membersPath.type !== "StringLiteral"){
        throw new Error('you need implement it for '+membersPath.type)
      }
      if(object.type === "SpreadElement"){
        throw new Error('SpreadElement not supported')
      }

      const paths = membersPath.value.split('.')
      let finalNode;
      paths.forEach((path, index)=>{
        if(index===0){
          finalNode = j.optionalMemberExpression(object, j.identifier(path))
        }else{
          finalNode = j.optionalMemberExpression(finalNode, j.identifier(path))
        }
      })


      if(defaultValue){
        nodeAstPath.replace(j.logicalExpression('||', finalNode, defaultValue))
      }else{
        nodeAstPath.replace(finalNode)
      }

      // nodeAstPath.replace(j.identifier('hello world'))
    })
      
    return rootSource.toSource();
}
      
export const parser = 'tsx'; 

export default transform;