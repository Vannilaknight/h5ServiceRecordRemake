var magicbus = require('@leisurelink/magicbus');

module.exports = function (config, io, dataMapper) {

    var broker = magicbus.createBroker('h5', 'record', 'amqp://docker.dev:5672/');

    var subscriber = magicbus.createSubscriber(broker);

    //console.log('DATA MAPPER')
    //console.log(dataMapper.spartanRank(26));

    subscriber.on('h5.player-update', function (eventName, data, rawMessage) {

        var allData = data.playerData;

        var profileData = {
            gamertag: allData.warzoneRecord.Id,
            spartanRank: allData.warzoneRecord.Result.SpartanRank,
            totalXP: allData.warzoneRecord.Result.Xp,
            emblem: allData.profileEmblem,
            spartanImage: allData.profileSpartan,
            advancement: dataMapper.spartanRank(allData.warzoneRecord.Result.SpartanRank)
        };

        var warzoneData = allData.warzoneRecord.Result.WarzoneStat;
        warzoneData.WeaponWithMostKills.WeaponData = dataMapper.weapon(warzoneData.WeaponWithMostKills.WeaponId.StockId);
        warzoneData.MedalAwards = dataMapper.medals(warzoneData.MedalAwards);
        warzoneData.Impulses = dataMapper.impulses(warzoneData.Impulses);


        var arenaData = allData.arenaRecord.Result.ArenaStats;
        arenaData.WeaponWithMostKills.WeaponData = dataMapper.weapon(arenaData.WeaponWithMostKills.WeaponId.StockId);
        arenaData.WeaponStats = dataMapper.weapons(arenaData.WeaponStats);
        arenaData.MedalAwards = dataMapper.medals(arenaData.MedalAwards);
        arenaData.Impulses = dataMapper.impulses(arenaData.Impulses);

        var recentMatches = allData.recentMatches.Results;
        recentMatches = dataMapper.gamesParse(recentMatches);

        var playerData = {
            profileData: profileData,
            warzoneData: warzoneData,
            arenaData: arenaData,
            recentMatches: recentMatches
        };

        io.emit('player-update', playerData)
    });

    subscriber.on('h5.no-change', function (eventName, data, rawMessage) {
        console.log(data);
    });

    subscriber.startSubscription();
};