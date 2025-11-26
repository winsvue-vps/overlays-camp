import axios from 'axios';
import { APIUser, RouteBases, Routes } from 'discord-api-types/v10';
import { fivemRequest } from './api';

interface DiscordAuth {
  access_token: string;
  token_type: string;
}

export abstract class DiscordAPI {
  static getAvatarURL(id: string, avatarHash: string) {
    return [RouteBases.cdn, '/avatars/', id, '/', avatarHash, '.webp'].join('');
  }

  static async fetchUser(discordAuth: DiscordAuth) {
    const user = await axios
      .get<APIUser & { avatarURL?: string, roles?: string[] }>(`${RouteBases.api}${Routes.user()}`, {
        headers: { authorization: [discordAuth.token_type, discordAuth.access_token].join(' ') },
      })
      .then((r) => r.data);

    const member = await fivemRequest.get("/bot-api/discord", { params: { id: user.id } }).then((r) => r.data);

    if (user.avatar) user.avatarURL = DiscordAPI.getAvatarURL(user.id, user.avatar);
    if (member?.roles) user.roles = member.roles;
      
    return user;
  }
}
