import funct from './../../lib/function';

module.exports = {
    name: 'help',
    desc: 'Daftar command yang dapat digunakan pada Aisha.',
    enable: true,
    regex: false,
    help: true,
    role: [],
    aliases: ['h'],
    usage: '[nama command]',
    cooldown: 0,
    func: (client: any, message: any, args: any) => {
        const data = [];
        const dev = funct.isDeveloper(message.member) && (args.length ? args[0].toLowerCase().match('dev') : false);

        if (!args.length || dev) {
            data.push('Hai! Ini adalah daftar command yang tersedia:\n');
            client.cmds.forEach((item: any) => {
                if (item.help || dev) data.push(`\`${item.name}\` : ${item.desc.split('.')[0]}.`);
            });

            data.push(`\nAnda dapat menggunakan \`${client.config.BOT_PREFIX}help [nama command]\` untuk mendapatkan informasi dari command tersebut.`);
        } else {
            const name = args[0].toLowerCase();
            const command = client.cmds.get(name) || client.cmds.get(client.cmdsalias.get(name));
            
            if (!command) return message.reply('Command tidak valid!');

            data.push(`Informasi mengenai command \`${command.name}\`:\n`);

            if (command.aliases) data.push(`\`Alias\` : ${command.aliases.length ? `${command.aliases.join(', ')}` : '-'}`);
            if (command.desc) data.push(`\`Deskripsi\` : ${command.desc}`);
            if (command.usage) data.push(`\`Penggunaan\` : ${client.config.BOT_PREFIX}${name} ${command.usage}.`);
            if (command.role) data.push(`\`Role\` : ${command.role.length ? command.role.map((i: any) => message.guild.roles.cache.get(`${i}`)).join(', ') : '-'}.`);

            data.push(`\`Regex\` : ${command.regex ? 'Ya' : 'Tidak'}.`);
            data.push(`\`Cooldown\` : ${command.cooldown} detik.`);
            data.push(`\nAnda dapat menggunakan \`${client.config.BOT_PREFIX}help\` untuk mendapatkan informasi dari semua command yang tersedia.`);
        }

        message.channel.send(data, { split: true });
    },
};
