import sampleBusAvatar from "../../assets/img/sample/wechat_chat_bus_avatar.jpg";
import sampleUserAvatar from "../../assets/img/sample/wechat_chat_user_avatar.jpg";
import sampleJokeAvatar1 from "../../assets/img/sample/wechat_joke_avatar1.jpg";
import sampleJokeAvatar2 from "../../assets/img/sample/wechat_joke_avatar2.jpeg";
import lwAvatar1 from "../../assets/img/default_avatar1.jpg";
import lwAvatar2 from "../../assets/img/default_avatar2.jpg";

const now = new Date();

export const SampleData: any = {
    Chat: {
        buy: {
            userName: "毛毛虫",
            userAvatar: sampleUserAvatar,
            otherName: "A货源",
            otherAvatar: sampleBusAvatar,
            messages:
                [
                    {
                        kind: "text", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, content: "你卖的产品好用不？亲爱的"
                    },
                    {
                        kind: "text", avatar: sampleBusAvatar, user: "A货源", unread: false, content: "亲爱的,你要染发膏还是护肤品？"
                    },
                    {
                        kind: "date", time: new Date(),
                    },
                    {
                        kind: "text", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, content: "护肤品"
                    },
                    {
                        kind: "text", avatar: sampleBusAvatar, user: "A货源", unread: false, content: "我的三部曲回头客很多，你是老师你也知道我朋友圈发的很差，我的客户多数都是我身边的人都是看到我的变化才来买的[blush]"
                    },
                    {
                        kind: "text", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, content: "[+1][+1]就是你用了好了，对吧？"
                    },
                    {
                        kind: "exchange", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, money: 198, title: "来一盒试试",
                    },
                    {
                        kind: "exchangeReceived", avatar: sampleBusAvatar, user: "A货源", unread: false, money: 198,
                    },
                    {
                        kind: "text", avatar: sampleBusAvatar, user: "A货源", unread: false, content: "感谢信任呢[blush]"
                    },
                ],
        },
        proxy: {
            userName: "毛毛虫",
            userAvatar: sampleUserAvatar,
            otherName: "A货源",
            otherAvatar: sampleBusAvatar,
            messages: [
                {
                    kind: "alreadyFriend",
                },
                {
                    kind: "text", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, content: "你好，朋友推荐的[slightly_smiling_face]"
                },
                {
                    kind: "redPackage", avatar: sampleBusAvatar, user: "A货源", unread: false, title: "欢迎新朋友", received: true,
                },
                {
                    kind: "redPackageReceived", sender: "毛毛虫", receiver: "A货源",
                },
                {
                    kind: "text", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, content: "谢谢老板"
                },
                {
                    kind: "voice", avatar: sampleUserAvatar, user: "毛毛虫", unread: false, voice: 34,
                },
                {
                    kind: "date", time: new Date(now.getTime() - 3600000 * 24),
                },
                {
                    kind: "voice", avatar: sampleBusAvatar, user: "A货源", unread: false, voice: 60,
                },
                {
                    kind: "voice", avatar: sampleBusAvatar, user: "A货源", unread: true, voice: 60,
                },
                {
                    kind: "voice", avatar: sampleBusAvatar, user: "A货源", unread: true, voice: 37,
                },
                {
                    kind: "text", avatar: sampleBusAvatar, user: "A货源", unread: true, content: "还在吗？",
                },
            ],
        },
        joke1: {
            userName: "舒克",
            userAvatar: sampleJokeAvatar1,
            otherName: "贝塔",
            otherAvatar: sampleJokeAvatar2,
            messages: [
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "你有几个小孩？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "五个。"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "那他们叫甚么名字？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "晓明、晓明、晓明、晓明、晓明。"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "都叫晓明，那你要叫他们吃饭时怎么办？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "那很简单，我只要叫晓明，他们都会来。"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "但是如果你只要叫某一特定小孩时，怎么办？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "那更简单，我只要叫他的姓就可以了。"
                },
            ],
        },
        joke2: {
            userName: "舒克",
            userAvatar: sampleJokeAvatar1,
            otherName: "贝塔",
            otherAvatar: sampleJokeAvatar2,
            messages: [
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "有没有那种天上掉钱的工作？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "有啊！"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar1, user: "舒克", unread: false, content: "啥工作？"
                },
                {
                    kind: "text", avatar: sampleJokeAvatar2, user: "贝塔", unread: false, content: "许愿池里当王八呗！"
                },
            ],
        },
        LoveWords1: {
            userName: "时光",
            userAvatar: lwAvatar1,
            otherName: "汤圆",
            otherAvatar: lwAvatar2,
            messages: [
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "你的眼睛好漂亮"
                },
                {
                    kind: "text", avatar: lwAvatar2, user: "汤圆", unread: false, content: "真的吗？"
                },
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "但没我的好看"
                },
                {
                    kind: "text", avatar: lwAvatar2, user: "汤圆", unread: false, content: "[sob]"
                },
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "因为我的眼里有你"
                },
            ],
        },
        LoveWords2: {
            userName: "时光",
            userAvatar: lwAvatar1,
            otherName: "汤圆",
            otherAvatar: lwAvatar2,
            messages: [
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "你喜欢狗么"
                },
                {
                    kind: "text", avatar: lwAvatar2, user: "汤圆", unread: false, content: "喜欢"
                },
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "我送你一只吧"
                },
                {
                    kind: "text", avatar: lwAvatar2, user: "汤圆", unread: false, content: "[fearful]"
                },
                {
                    kind: "text", avatar: lwAvatar1, user: "时光", unread: false, content: "单身狗， 我妈说她不想养了(*＾ー＾)"
                },
            ],
        },
    },
};