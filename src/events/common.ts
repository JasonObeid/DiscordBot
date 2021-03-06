import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import type { Client } from "discordx";
import { Discord, On } from "discordx";
import { loungeTextChannelId } from "../constants";

@Discord()
export class Greeter {
  @On("guildMemberAdd")
  async onGuildMemberAdd(member: GuildMember, client: Client): Promise<void> {
    // the types imply that member shouldn't be an array, but somehow it is...
    if (Array.isArray(member) && member.length > 0) {
      member = member[0];
    }

    const username = member.user?.username;
    const mention = member.toString();

    const channel = client.channels.cache.get(
      loungeTextChannelId
    ) as TextChannel;

    console.log("guild member added - ", username);

    if (channel) {
      const welcomeEmbed = new MessageEmbed({
        color: "#5cf000",
        title: `Welcome to the server, ${username}`,
        description: `We're glad to have you here, ${mention}!\nPlease make sure you change your name so we all know who you are.\n\nWe have four fun intro questions for you:`,
        fields: [
          { name: "1)", value: "Who sent you the invite?", inline: false },
          { name: "2)", value: "What tech do you enjoy?", inline: false },
          { name: "3)", value: "What do you do for fun?", inline: false },
          {
            name: "4)",
            value: "Is poutine delicious or gross?",
            inline: false,
          },
        ],
      });

      channel.send({ embeds: [welcomeEmbed] });
    } else {
      console.error(
        `failed to find the channel with id ${loungeTextChannelId}`
      );
    }
  }
}
