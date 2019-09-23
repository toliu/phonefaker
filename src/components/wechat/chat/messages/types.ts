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

export type RedPackageMessage = UserMessage & {
    kind: "redPackage",
    title: string,
}

export type ExchangeMessage = UserMessage & {
    kind: "exchange",
    money: number,
    postscript: string,
}

export type ImageMessage = UserMessage & {
    kind: "image",
    src: string,
}

export type MessageTypes = TextMessage |
    VoiceMessage |
    RedPackageMessage |
    ExchangeMessage |
    ImageMessage;
