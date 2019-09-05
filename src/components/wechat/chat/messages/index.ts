type UserMessage = {
    user: string;
    avatar: string;
    unread: boolean;
}

export type TextMessage = UserMessage & {
    kind: "text"
    content: string;
}

export type VoiceMessage = UserMessage & {
    kind: "voice"
    voice: number;
}

export type DatetimeMessage = {
    kind: "date",
    time: Date;
}

export type MessageType = TextMessage | VoiceMessage | DatetimeMessage;
