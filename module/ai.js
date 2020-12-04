function nodeToKey(node)
{
    return node.x + "," + node.y;
}

function pointEq(src, dst)
{
    return src.x == dst.x && src.y == dst.y;
}

function closer(a, b, dst)
{
    let aDist = (a.x - dst.x)**2 + (a.y - dst.y)**2;
    let bDist = (b.x - dst.x)**2 + (b.y - dst.y)**2;
    if (aDist <= bDist)
    {
        return a;
    }
    else
    {
        return b;
    }
}

function farther(a, b, dst)
{
    let aDist = (a.x - dst.x)**2 + (a.y - dst.y)**2;
    let bDist = (b.x - dst.x)**2 + (b.y - dst.y)**2;
    if (aDist >= bDist)
    {
        return a;
    }
    else
    {
        return b;
    }
}

function occupied(node)
{
    return game.combat.combatants.find(combatant => {
        return combatant.token.x == node.x && combatant.token.y == node.y;
    });
}

export function checkCollision(source, destination)
{
    return canvas.walls.checkCollision(new Ray(
        {x: source.x + 50, y: source.y + 50},
        {x: destination.x + 50, y: destination.y + 50}
    ));
}

export function findPath(source, destination, maxDepth)
{
    if (!maxDepth) maxDepth = 25;
    source = {
        x: Math.round(source.x / 100) * 100,
        y: Math.round(source.y / 100) * 100
    }
    destination = {
        x: Math.round(destination.x / 100) * 100,
        y: Math.round(destination.y / 100) * 100
    }

    const previousNodes = {};
    previousNodes[nodeToKey(source)] = true;
    let currentNodes = [source];
    let depth = 0;
    let closestNode = source;
    // While there are nodes to check and depth is not exceeded
    outerLoop: while (currentNodes && depth++ < maxDepth)
    {
        const nextNodes = [];
        for (let node of currentNodes)
        {
            // Check if this node is better than the previous best
            closestNode = closer(closestNode, node, destination);
            // Check if we've reached the destination
            if (node.x == destination.x && node.y == destination.y)
            {
                break outerLoop;
            }
            // Check all neighbors for pathability
            for (let i=0; i < 9; i++)
            {
                if (i == 4) continue;
                let xDelta = (Math.floor(i/3) - 1) * 100;
                let yDelta = (i%3 - 1) * 100;
                let neighbor = {x: node.x + xDelta, y: node.y + yDelta};
                // If this node has not been visited, isn't blocked by wall,
                // and isn't occupied.
                if (!previousNodes[nodeToKey(neighbor)]
                    && !checkCollision(node, neighbor)
                    && !occupied(neighbor))
                {
                    // The neighbor's previous is the current
                    previousNodes[nodeToKey(neighbor)] = node;
                    // Add the neighbor to next run of nodes
                    nextNodes.push(neighbor);
                }
            }
        }
        currentNodes = nextNodes;
    }

    // Walk backward from here to the start
    let path = [closestNode];
    let node = closestNode;
    while (!pointEq(node, source))
    {
        path.unshift(previousNodes[nodeToKey(node)]);
        node = previousNodes[nodeToKey(node)];
    }
    // Simplify the path
    for (let i=0; i < path.length - 2;)
    {
        if (!checkCollision(path[i], path[i+2]))
        {
            path.splice(i+1, 1);
        }
        else
        {
            i++;
        }
    }
    // Return the path
    return path;
}
