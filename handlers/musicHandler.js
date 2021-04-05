const { Manager } = require("erela.js");
const ms = require("ms");
const discord = require("discord.js");

function config(client) {
    /* Music Configuration */
    client.manager = new Manager({
        nodes: [
            {
                host: "localhost",
                retryDelay: 5000,
                port: 2220,
                password: "cryptonmusic",
            },
        ],
        autoPlay: true,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
        .on("nodeConnect", (node) =>
            console.log(`Node "${node.options.identifier}" connected.`)
        )
        .on("nodeError", (node, error) =>
            console.log(
                `Node "${node.options.identifier}" encountered an error: ${error.message}.`
            )
        )
        .on("trackStart", (player, track) => {
            const channel = client.channels.cache.get(player.textChannel);
            const playingEmbed = new discord.MessageEmbed()
                .setAuthor("Crypton Music")
                .setColor("#2DDBE2")
                .setTitle(`${track.title}`)
                .setThumbnail(track.displayThumbnail("maxresdefault"))
                .setURL(track.uri)
                .setFooter(`Req. by ${track.requester.tag}`)
                .addFields(
                    {
                        name: "Author:",
                        value: track.author,
                        inline: true,
                    },
                    {
                        name: "Duration:",
                        value: ms(track.duration),
                        inline: true,
                    }
                );
            channel.send(playingEmbed);
        })
        //eslint-disable-next-line
        .on("trackEnd", (player, track, payload) => {
            // console.log(player);
        })
        .on("queueEnd", (player) => {
            const channel = client.channels.cache.get(player.textChannel);
            channel.send("Queue has ended.");
            player.destroy();
        });

    /* extraEvent */
    client.on("raw", (data) => client.manager.updateVoiceState(data));
    client.once("ready", () => {
        //Initialzes Music
        client.manager.init(client.user.id);
    });
}

module.exports.config = config;
