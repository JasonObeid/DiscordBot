import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { MessageEmbed } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";

@Discord()
export class SlashCommands {
  @Slash("help", { description: "Pagination for all slash command" })
  async pages(interaction: CommandInteraction): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { description: cmd.description, name: cmd.name };
    });

    const pages = commands.map((cmd, i) => {
      return new MessageEmbed()
        .setFooter({ text: `Page ${i + 1} of ${commands.length}` })
        .setTitle("**Slash command info**")
        .addField("Name", cmd.name)
        .addField("Description", cmd.description);
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }

  @Slash("about", { description: "About the 3dtc bot" })
  async about(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(
      "This bot sends a friendly greeting when a new user joins. Source code available at https://github.com/JasonObeid/DiscordBot"
    );
  }
}
