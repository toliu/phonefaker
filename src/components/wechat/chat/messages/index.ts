type UserMessage = {
    user: string;
    avatar: string;
    unread: boolean;
}

type TextMessage = UserMessage & {
    kind: "text"
    content: string;
}

type VoiceMessage = UserMessage & {
    kind: "voice"
    voice: number;
}

type DatetimeMessage = {
    kind: "date",
    time: Date;
}

type AlreadyFriendMessage = {
    kind: "alreadyFriend",
    who: string;
}

export type MessageType = TextMessage | VoiceMessage | DatetimeMessage | AlreadyFriendMessage;
