const grid = [
  [1,1,1,1],
  [0,1,1,0],
  [0,1,0,1],
  [0,1,9,1],
  [1,1,1,1],
];

function getGoal(grid) {
  let goal = [];
  grid.forEach((element, index) => {
    let column = element.findIndex((el) => el === 9);
    if(element.findIndex((el) => el === 9) > -1){
      goal.push(index);
      goal.push(column);
    };
  });
  return goal;
};

function fastestPath(grid, goal) {
  const getValidSteps = function(node){
    var x = node[0],
        y = node[1],
        steps = [];
    if (grid[x-1] && grid[x-1][y]) steps.push([x-1,y]);
    if (grid[x+1] && grid[x+1][y]) steps.push([x+1,y]);
    if (grid[x][y-1]) steps.push([x,y-1]);
    if (grid[x][y+1]) steps.push([x,y+1]);
    return steps;
  };

  const getFromGoal = function(node){
      return Math.abs(node[0]-goal[0]) + Math.abs(node[1]-goal[1]);
  };

  const start = [0,0];

  const findPath = function(start){

    const sortNodes = function(a,b){
      aStr = a.toString();
      bStr = b.toString();
      if(combinedScore[bStr] < combinedScore[aStr]){
        return -1;
      }else if(combinedScore[bStr] > combinedScore[aStr]){
        return 1;
      }
      return 0;
    };

    const walkPath = function(node){

      let result = [node];
      const getNext = function(currNode){ 
        const nodeStr = currNode.toString(),
            nextNode = fromNode[nodeStr];
            if(nextNode){
              result.push(nextNode);
              getNext(nextNode);
            }
      };
      getNext(node);
      return result.reverse();
    };

    let possibles = [start], // array to keep track of possible steps to explore
        fromNode = {},
        combinedScore = {},
        fromStart = {'0,0': 0},
        fromGoal = {},
        current,
        currStr,
        nextSteps,
        step,
        stepStr,
        i;

    while(possibles.length){
      possibles.sort(sortNodes);
      current = possibles.pop();
      currStr = current.toString();

      fromGoal[currStr] = fromGoal[currStr] || getFromGoal(current);
      if (!fromGoal[currStr]){
        return walkPath(current);
      }

      currFromStart = fromStart[current] || 0;
      nextSteps = getValidSteps(current);

      for(i = 0; i < nextSteps.length; i++){
        step = nextSteps[i];
        stepStr = step.toString();
        if((typeof fromStart[stepStr] === 'undefined') || fromStart[stepStr]>currFromStart+1){
          fromStart[stepStr] = currFromStart+1;
          fromNode[stepStr] = current;
          fromGoal[stepStr] = fromGoal[stepStr] || getFromGoal(step);
          combinedScore[stepStr] = fromStart[stepStr] + fromGoal[stepStr];
          possibles.push(step);
        }
      }

    }
    return false;

  };

  return findPath(start);
}

const goal = getGoal(grid);
const response = fastestPath(grid, goal);

console.log(`Goal(9 position): ${goal}`);
if(response){
  console.log('Fastest path to goal:', response);
} else {
  console.log('There is no possible path to the goal');
}
