export async function selectTokens(text)
{
    game.uitools.hoveredToken = null;
    const selectedTokens = new Set();

    document.body.style.cursor = "crosshair";
    if (text)
    {
        ui.notifications.info(`Select any number of ${text}, then click the board.`);
    }
    while (true) {
        const token = await new Promise(resolve => {
            Hooks.once("clickToken", resolve);
        });
        if (token) {
            if (selectedTokens.has(token))
            {
                selectedTokens.delete(token);
                token.targeted.delete(game.user);
                token.refresh();
            }
            else
            {
                selectedTokens.add(token);
                token.targeted.add(game.user);
                token.refresh();
            }
        }
        else {
            break;
        }
    }
    document.body.style.cursor = "";

    selectedTokens.forEach(token => {
        token.setTarget(false);
        token.refresh();
    });
    return selectedTokens;
}


export async function selectToken(text)
{
    document.body.style.cursor = "crosshair";
    if (text) {
        ui.notifications.info(`Select ${text}, or click the board to cancel.`);
    }
    const token = await new Promise(resolve => {
        Hooks.once("clickToken", resolve);
    });
    document.body.style.cursor = "";
    return token;
}


function onHoverToken(token, selected)
{
    if (selected)
    {
        game.uitools.hoveredToken = token;
    }
    else
    {
        if (game.uitools.hoveredToken === token)
        {
            game.uitools.hoveredToken = null;
        }
    }
}


Hooks.once("init", () => {
    game.uitools = {
        hoveredToken: null
    };
});


Hooks.once("ready", () => {
    Hooks.on("hoverToken",  onHoverToken);
    $("#board").click(ev => {
        if (game.uitools.hoveredToken)
        {
            Hooks.call("clickToken", game.uitools.hoveredToken);
        }
        else
        {
            Hooks.call("clickToken", null);
        }
    });
});
