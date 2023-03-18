export {};

declare global {
  namespace Amity {
    type Mention = {
      type: 'user' | 'channel';
    };

    type ChannelMention = Mention & {
      type: 'channel';
    };

    type UserMention = Mention & {
      type: 'user';
      userIds: string[];
    };

    type MentionType = {
      channel: ChannelMention;
      user: UserMention;
    };

    type Mentionable<T extends keyof MentionType = 'channel' | 'user'> = {
      mentionees?: MentionType[T][];
    };
  }
}
