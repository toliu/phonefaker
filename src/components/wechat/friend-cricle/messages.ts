type ForwardMessage = {
    picture?: string,
    title: string,
    kind: "forward",
}

type PictureMessage = {
    pictures: string[],
    kind: "pictures",
};

type AdditionMessage = ForwardMessage |
    PictureMessage;

export type CommentMessage = {
    by: string;
    to?: string,
    content: string,
}

export type FriendCircleMessage = {
    userName: string,
    userAvatar: string,
    message?: string,
    like: string[],
    comments: CommentMessage[],
    addition?: AdditionMessage,
    location?: string[],
    timestamp: Date,
}
