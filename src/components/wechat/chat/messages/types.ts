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

export type DateTimeMessage = {
    kind: "datetime",
    datetime: Date,
}

export type RejectMessage = {
    kind: "reject",
    user: string,
    rejectBy: string,
}

export type AlreadyFriendMessage = {
    kind: "friend",
    sender: string,
    user: string,
    friend: string,
}

export type RedPackageReceivedMessage = {
    kind: "package-received",
    sender: string,
    user: string,
    friend: string,
}

export type MessageTypes = TextMessage |
    VoiceMessage |
    RedPackageMessage |
    ExchangeMessage |
    ImageMessage |
    DateTimeMessage |
    RejectMessage |
    AlreadyFriendMessage |
    RedPackageReceivedMessage;
