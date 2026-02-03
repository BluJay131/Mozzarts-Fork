
const hints = new Map([
    ["never gonna give you up", "Rick Astley"],
    ["bohemian rhapsody", "queen"],
    ["radioactive", "imagine dragons"],
    ["ground control to major tom", "david bowie"],
    ["mr blue sky", "Jeff Lynn"],
    ["rap god", "eminem"],
    ["tonight we are young", "fun."]
]);

function getHint(songName){
    if(hints.has(songName)){
        return hints.get(songName);
    }
    return "This song is not in the list!";
}

module.exports = {
    getHint,
};