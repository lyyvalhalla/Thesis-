function parseTree(parent) {
    var hasNonLeafNodes = false;
    var childCount = 0;
    
    
    for (var child in parent) {
        if (typeof parent[child] === 'object') {
            // Parse this sub-category:
            childCount += parseTree(parent[child]);
            // Set the hasNonLeafNodes flag (used below):
            hasNonLeafNodes = true;
            // console.log(parent[child] + "; " + parent[child].url);
            // if (parent[child].url) {
            //     nodes.push(parent[child]);
            //     console.log("url");
            // } else if (parent[child].url === undefined) {
            //     folders.push(parent[child]);
            //     console.log("folder");
            // }
        }
    }

    
    if (hasNonLeafNodes) {
        // Add 'num_children' element and return the recursive result:
        parent.num_children = childCount;
        return childCount;
    } else {
        // This is a leaf item, so return 1:
        return 1;
    }
}


function bmInit(object) {

    root = object[0].children[0];
    // console.log(bmParent);
}
