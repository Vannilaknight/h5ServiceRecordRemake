var fs = require('fs');

exports.spartanRank = function spartanRank(spartanRank) {
    var ranks = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/spartanRanks.json', 'utf8'));
    var advancement = {
        currentRank: spartanRank,
        nextRank: null
    };

    ranks.forEach(function (rank) {
        if (rank.id == spartanRank) {
            advancement.nextRank = ranks[spartanRank];

        }
    });

    return advancement;
};

exports.weapon = function weapon(weaponId){
    var weapons = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/weapons.json', 'utf8'));
    var weaponData;

    weapons.forEach(function(weapon){
        if(weapon.id == weaponId){
            weaponData = weapon;
        }
    });
    return weaponData;
};

exports.weapons = function weapons(spartanWeapons){
    var weapons = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/weapons.json', 'utf8'));
    var weaponData;

    spartanWeapons.forEach(function(spartanWeapon){
        weapons.forEach(function(weapon){
            if(weapon.id == spartanWeapon.WeaponId.StockId){
                spartanWeapon.WeaponData = weapon;
            }
        });
    });

    return spartanWeapons;
};

exports.medals = function medals(spartanMedals){
    var medals = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/medals.json', 'utf8'));
    var medalData;

    spartanMedals.forEach(function(spartanMedal){
        medals.forEach(function(medal){
            if(medal.id == spartanMedal.MedalId){
                spartanMedal.MedalData = medal;
            }
        });
    });

    return spartanMedals;
};

exports.impulses = function impulses(spartanImpulses){
    var impulses = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/impulses.json', 'utf8'));
    var impulseData;

    spartanImpulses.forEach(function(spartanImpulse){
        impulses.forEach(function(impulse){
            if(impulse.id == spartanImpulse.Id){
                spartanImpulse.ImpulseData = impulse;
            }
        });
    });

    return spartanImpulses;
};

exports.gamesParse = function gamesParse(games){
    var gameBaseVariants = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/gameBaseVariants.json', 'utf8'));
    var maps = JSON.parse(fs.readFileSync('./server/utilities/dataMaps/maps.json', 'utf8'));
    var impulseData;

    games.forEach(function(game){
        gameBaseVariants.forEach(function(gameBaseVariant){
            if(gameBaseVariant.id == game.GameBaseVariantId){
                game.GameBaseVariant = gameBaseVariant;
            }
        });
        maps.forEach(function(map){
            if(map.id == game.MapId){
                game.Map = map;
            }
        });
    });

    return games;
};
