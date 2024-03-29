type UserMessage = {
    user: string,
    avatar: string,
    unread: boolean,
}

type TextMessage = UserMessage & {
    kind: "text"
    content: string,
}

type VoiceMessage = UserMessage & {
    kind: "voice"
    voice: number,
}

type RedPackageMessage = UserMessage & {
    kind: "redPackage",
    title: string,
    received: boolean,
}

type ExchangeMessage = UserMessage & {
    kind: "exchange",
    money: number,
    title: string,
}

type ExchangeReceivedMessage = UserMessage & {
    kind: "exchangeReceived",
    money: number,
}

type ImageMessage = UserMessage & {
    kind: "image",
    src: string,
}

type DatetimeMessage = {
    kind: "date",
    time: Date,
}

type AlreadyFriendMessage = {
    kind: "alreadyFriend",
    who: string,
}

type RedPackageReceived = {
    kind: "redPackageReceived",
    sender: string,
    receiver: string,
}

export type MessageType = TextMessage |
    VoiceMessage |
    DatetimeMessage |
    AlreadyFriendMessage |
    RedPackageMessage |
    RedPackageReceived |
    ExchangeMessage |
    ExchangeReceivedMessage |
    ImageMessage;
