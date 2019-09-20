type UserMessage = {
    name: string;
    avatar: string;
    rejected: boolean;
    unread: boolean;
    mine?: boolean;
}

export type TextMessage = UserMessage & {
    kind: "text",
    content: string;
}

export type VoiceMessage = UserMessage & {
    kind: "voice",
    voice: number,
}

export type MessageTypes = TextMessage | VoiceMessage;
