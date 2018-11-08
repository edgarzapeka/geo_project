export const classifyTreesByHight = (trees) => {
    let classifiedTrees = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: []
    }

    trees.forEach(t => {
      classifiedTrees[parseInt(t.height / 10)].push(t)
    });

    return classifiedTrees;
};

export const getMaxNumberOfTreesPerCluster = trees => {
    return Math.max(...trees.map(t => t.length))
};

export const getMinNumberOfTreesPerCluster = trees => {
    return Math.min(...trees.map(t => t.length))
};