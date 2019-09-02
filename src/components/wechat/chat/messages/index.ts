type UserMessage = {
    user: string;
    avatar: string;
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

export type Message = TextMessage | VoiceMessage | DatetimeMessage;
