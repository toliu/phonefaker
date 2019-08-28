import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';

import {Chat} from "../src/components/wechat/chat/chat";
import {ChatController} from "../src/components/wechat/controllers/chat";

storiesOf("微信", module)
    .add("对话", () => {
        const myAvatarUrl = "data:image/jpeg;base64,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";
        const other = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEAkQEBAKChILDQ0ODQ0NDQ8NCggNIBEWIiARHx8kHSggJBolGxMTIT0hJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFQ8NFSsZFRkrKysrKzctLTctLTcrLSsrKzcrLSs3Ky0rLS0rKys3Ky0rLSsrKystKysrLS0rKysrLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAwQFBgECBwj/xAA/EAACAQMCAgcGBAMIAQUAAAABAgMABBESIQUxBhMiMkFRYUJScYGRwQcjobEUYtEIM0NTcoKS8OEkZKKy8f/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgIDAAMAAwAAAAAAAAABAhEDIRIxQSIyUQRhcf/aAAwDAQACEQMRAD8A7FZNT+o6x8KkaAorVjjPpuayrZx60GaKKKAooooMHxrk/Tn8QJ7Y3UUclgSVKiJon/iMHY75Knb4Up+MfTRrRYbWBmWSUF5TjsrH4DIPP+lcIluS2onVljlmY/rmitqQ4vxwz7COKAe0ELlpvU5J/SopXx86Rd9/E+VbRsNwc78j/NRGjk3RBjxp7G/+msGfdcYOAv15/emjkjNY6z9BihIlbHickLB4yokWTUjFc9Ww5bcj8xV74P8AjPxKJl68Wd6mQGUx9RJj0Zdh8wa5hr5VjrPjUJ7erOhHTIcSiWQQm3ySpxKswVxzBGAR9MetW2vJ3QPpdLw26hlXtxMdM8JZQsqHbIJ5MPP616m4bepPFFKmSsihhnvfOpTDuiiiiWFGPSs0UUBRRRQNrm40AYDOWOFVe83if0orS7iYmJk0loycashSCMHl9flRUdmiVjzFSNR1kdxUjUgooooCiiigKwx+J9BWaSmbSrnnpVmwT3sCg8s/ibcyS8TvmlI1a8CMbraRjux58Tjn6mqysYYbmQ4+a/vSnEblpJZ5GOWlmlkds+0XJpCFGJ7IZiPAVFQ0kix/3u1oflT7+CkOMo49SM0/t+j0rjOh3zuSuns/U1HlE+NvxBtuB44GK0K/r4mpu94NLHgBdRIzpVusZfpypCXhTqEySpYd0j7U8oeNiLzz5VjPwpxLbMvkcbfOkDUxDK8wdtt69R/hHxeO54ZZ6NCNbgwzRqTiJx6EkgEb/wDcV5b8vD1rvP8AZ0vFaDi0J064ZonB9po2B/TKn61I7HRRRRIooooCiiigKKa3kxQKVGrLYI37PPfaigQsvCpGouwPL41KCgKKKKAooooCm1/jqp85A6uTURzC6TTmmnEwTDcgZy0UgGBk50Gg8eaMs2xIY9knvLXQuhHRpeqEj6WZjsvsrXO0QhgvbBU6SG7ymu39F4gtvB8Kw58rJI3/AMXCZZbrdOjcRIYqufAAdmpnh3BIwD2UBA2bT3a3h3x4U+iQ7/aufC9u7PGaM5+AppbOkkKQNK9laq930WVjv5ewMM3zq5yufWmUqnzK+VTlf4jHGfXO+I9D4BnYn5+1VK4twFo+sYZIGcZ9muvXkJJY74qucYhXS4ODmpw5LKpy8ONm5HJpEx5+ldn/ALNkJ1cdfw02ifPMhrk3GINMjDlnfnXX/wCzqqqvGCZIQ0zwqkPWL17BAdT6fd7YGfjXZLubebrV07ZRRRUpFFFFAUUUUDW9aQKeqCs2RjV3cUU6ooIuxHKpQVHWg5VIigKKKKAooooCq30vaQi2SNtOWdmB7sqgd0+m9WSoXpHGCkR5EOAD8R/4qmf61pw685t5r4nwMpxNrcoYxLNlVJy2gnPPx+NdZsotEaKPZCioDpXwxxxDg1y+G643CKR3uwoP3qduUZon057Qx2e9XLyZXLUd3FhMLlr+pK3ZMjtoMcxmpOKQDIypz61z2e1WNS09ytmrcixYzSfBeZ+VV9ryASD+G4lfh2wwMkLJHInhjI5VGOP0zzu9V16R8k/vScrjHnVU4Ff3LFBIwmxtqUYpv0p49JDIkSA6nUlc92q/8X3JNpziUigHdE88mqhxm8gGoaw22Mju1WuJruZL24vHyCeqt1ULGOeMkgZwQcbmmU4t3RREbqMumpEuB/eD0IrTHj+sM+e3rSH4w2ppG2OORqd/CWZl4xwbTnLzMjY9pDG+flVbkXaQbnY4zV4/AiFX4xblhnqLa5kTPstpC5+jmurGdacN7u3pmiiirAooooCiiigb3KMRhSV337Wj9cGii6t+sAGSMHPoedFAlaU9FMrXwp4KDNFFFAUUUUGKj+NWxkhkC51Lhlxz1DepCios3NJl1dxy/pFF1g4dIc/ku+3ukrzp1w4qVGcVP9JOBKYbp0Zl0hperAGnI3OPLxqqcKbcZri5MLje3p8PJjluw5l4NCJFmWKOSQbhnOW+ROcVFw9HIY2uGjs7aA3I0SkyM+oZzgDO2/lirbAgI5A/Kt5QiDJKr45NJvXtbKS3uGFlw9IkXCovoBUN0ptEFxaSMqkZAOfaqcEoYnB1b8x7tQX4klkt4nUbx4bPoOdV1svUJXtijrIohtJlkfrXWSNT1j++c53xtUDddHeukjaZUVYVxGid2P6cqnejF6s8Ctk5x3WGGpe9cKrnYY8ai5UmGNjl/S61jjkAjCppRtseAq//ANn7o0yJd8QkUqLheotdQ78QbLv8CQo/2mq1wa3hvuOcPglVZomEvWRt3ZAEJwfpXoS3gSNERFWNUUIiIuhEUcgAOQrt45fGbeZy687o4ooorRQUUUUBRRRQaSOAMnb9axWtxMqDLZIzjYZrNA3taeCmdrTwUGaKKKAooooCiiigTljDKyncMpU/A1y7qmjMi+MTlD8mxXVDVE6TWphuHf2LrtqcbLIO8PvWHPjvHbo/xstZa/qPg4rgY5HyNaW8Ulw5d8rHH3EP+I/mfSkWUZU8/OmqcaKu66ZdK83WJzGvnkgVyPQuWkuvF4Nca61R0OmRGGGVqg/xG41H/DzrlcsmlRmlr64sZ8l54NTDAKhus+tUHpNwoqmHmjuGDZRuuyuj18q0mO7qqcmVktkS/R/jcc1yFTMapbxAupwrONiKX6ZcV6pSAclthvVI4fM0ckawlZXY4IQ5VfnUl0idnePXv1Sdo59upuEmX+mE5b4WfUj+DMTy8btn7R6qG5lY+mjT+7ivSAFcn/AngJSO+4g6lP4siC3yO9Cp7T/N9v8AZXWK7MfThvttRRRUgooooCiiigTliVsagGwcgEeNYpK9uerXVgvuBpHeooNbY07FM7ena0G1FFFAUUUUBRRRQYqq9OMyRNGmC0eJQT7Ljl/31qw312sSljv4KPeNVeWQkyFu1rOSay5MprS+Eu9qTZ8Q1ZByrLsyn2W92rDZyjTjAGfCq50gsCkhlTKhj2sDut71bcO4ppwr7eR9lq47NV6OGe4kuIXBh1MI0mU7lNCn9DVM4nOJ9YSzjiLHdjEqafoKvsd7Ew9g7eJqOvr+3jU5MftHA9pvGrS2LZZbikcO4Wtt2sAMd2Y/amfBoV4hxSwtXLCKebEhXvugUk48u7jPrWnSzpBksqdnUMD4VXujvHJbC7t7yMRO8BYqsgYo2VIKnHoxrfjwt/LJwcucnWL15a2yRJHHGqRJGoSNEGFjQcgKXrn/AEY/Ffhl2IVklXh0z7NDOcRK/o/dI8s4q9QTo4DI8cqnkyMHX6iuhgVzWc1jNFBtRWBWaAooooMYorNFBHWj5qQWo+08PjUgtBmiiigKKK1ZgAScADmTQZqN4txHqwQukufP2KR4hxYAMItz7x8PhUDJITqJJJO5J31VlnnJ1F8cd+ypuDLnUSWHiT2l+FaI+Dg7Ecx7LD3h6U3hbJPgaUkcMFVsxsN0bHdb7/CsmrTiFmJFYYzkf8qpXFbMwFg2Sh5N/l/H+tXi1uCdStgMh0sPZ9GHoa0vbZZVZTpORtVLNrY5XG9OXXhwAUkZdtiCpVqipgXydbsfAHbTU30k6NzwmR4BqUli0R7rfDyNUu14niRlfK52www0beRqZhfcMs5b2bcRhw25znnneo+RcnAOcsF/Wp+aHrDnIOOWKacPgB647ExTKcegNbY5ddsMsbvpGXEGlvPBwadWt3c2jh7ae4tyV1B4JWRgvrj71LTcMYuRjZ96kuF8IaMvyZZVKspHd/rVvNn41J9HPxf4pEVWU2/ElGB+dH1c3/JcfqDXSOEfitBJjr7a5tT4sjLPHn9D+lcN4Bwtu8fZOPpV74ZZjC5A3qMs9elscduyWHSaznGY54uWdLnqm+jYqVilVgCrKwPIqciuPR2Hw+FP+GXkluwKO0fmOcbfEeIpOT+puLq1FR3BuIi4jDbIynEiZz1b/wBDzFSNaqiiiigjrWpBaZxJTxaDNYzWruACTsAMk+VVjiXFHlLKupE5ADZpPjVcspEybS95xiOPI/vG91Tt9agrviMkhOrGPZQZ0D+tNSvLbO3iKwE27J049k91qxyztazCRnO29alvDnWQ2f5T4ikpFI9aqtpqxwwO4zTxlDr4GmJbNKW03gdqIjDxgFCS6Y1KHHd0nwPpSwjA3/MbB5Fu7S2c+uaRZGUHSOsUf4ZbEi/6T9jt6iqrB0DZzvnzqodMugMd4jyQaYLhR2Tyjuf5G+x8KtsEisG0EtoOHVlxNCfJhzFbo3Oplsu4iyX285I0ttLJFKskTRtpkRtWqNqc28DlpHTI1Ekj2WWuydLui0V8ok0rHPEuFcD++X3G+3lVTs+CaDgjToOCCO6anLkk+Jw47ldbPrXhqvBZyYGXiU77drTT6DhpwpYgnwVRhYf60/gixbKo26tmx/KK3jbsry5eFVl3Fc8dXStcK4eB1/8AJNMv/wAzUvawY28vOscIj3vfW6m+1PGTST6GrVUvEhx51rN407i3X4imEr/mBBz5mhUx0e4kIZI2dtCP+VKWPZX3XP8A3xroINclmTa6Q8pIXb/cP/2rb0D4yZYlgkZWkgiRly35kkPLUR6EYz8K1wy+KZe1uooorVUytWp4KZW1PVoIzj8umIj/ADHVPlzP7VWlfHl6VO9Kf7uHxxJ9qrxbOKw5Pa+BcHPlWNGPnWsa7eApQhsbdXtzBDVk1ayJkDzHI+7SaHIOcgrsR96UMhHeVhj2lOVpKQ7h13xzHvLVjZJ035YpMqefex408kUOuV3yP+P8tRySaXwds+dFakbaTIpRjTOVSuGFO4mBUczmi0pvd24fSwZ4ZEGI5o9PWL/Kc7Mnodqjk4zpkEFyEtZGOIpl2sr/AOBPdf0P1qWkOM1HXVnHcK8coEit595T5iiLT13KkA7edR/E7fUdageTY9qmEU8tiVhuNU9uezDcHeS28lPpUrNJtnIIYZBHdYH2qpe+lscrjdmMQ/LYe+CR8qa2TnS45aCw5VJXTqYrHTgFTcxyfzHII/Q1EQdl35YYFW/rTWulc8vK7Z4Pv/GH/wB3N458qfTpkHlTfg/ckbl1k1ww/wBPWkfanUo51e+1fjfh8uQR64qPZtN7pPJ4dQ+uKd2mzH1qP43Jou+Fv/mGWFj8VyP/AKU+p+NukVwIzAxIUSdbGze6piJ+1Y6LO9pcrey6kMwELxHu2lnq2THv+0fXam3Sfe54CnPXdFtxnlEf25/KnfFUMpEa9lI/71/dX3R5mpl8dK2bdfRgQCMEEZBHI0VVfw84l1lu8BRojZP1cYZ9bTW/sv6eIx6UV0S7jNYLUU8FNbUU7qRFdI0zAf5WUiqutW7jK5gn9Fz9DVQX5VjyTtfAslKrSK+FKisWs9NtPP8Aam0kfPYp6ju06ApCfPrVkUycupDJ59pfZk/80lxFM9XIvJt80pNOV5/UVtbOsqSLsNO+B61VBzZOJI1+GDScAMbMN8NyHu004W+lnQ7b7VKypVglcNt96aWj9us3hxgc6xZL2vKh9P5o1dSrqrqwwVYZVqg5LLqPy8s0Mh/Jye1bS+58D4eu3jU9iobpW+i1uzyxE5DDvKwGQfrVddpyVziV+Y5bPmFEyxyLn3hgN9cfWntymHPLHPeq9est1bWtz2g13bhdI1fl3AydvAdtDVpgcSw28o362BH29RVsorPWmvAv7i38MgnHu5cmnbjcio7o5IDBEMg6GlQkekpFPpGGr4YyfZpUhR/UVEdKVyLR8hRbzJNI5PZjQZB+ZzgDxJFSVxPjdFLebPsq/Lmf0qvcfzLG2sltHa08lVvQefrSe0VIW8vXXXDH5aYLlwfdzoU/uRU3cgKjbZxyA9pqqvRTVJPAeQihuwQe9paVMferfLFnGeS8hTInpEWXFP4GcXkjaIo4ykwPdkDYCjHxxRWnSJokjWWZUkSJ8hGCmNnO2ojx5mipxyulLi61a+NO6a2o506rpVN75cxzDzjf9qo6749KvzrkEeYxXPXkQOykiNgzAatlasuSLY+zpW+VLA8vGk4xnmK3XbzHxrCNo3U/GsOfnWRQ1SimU6c+VQ9hepFeJEfyzMjhUY/lzeIK+ux2qcuRttvmq9xeFSYJGU6raUSxsvejceXxGxqEJPiKdXKjctRqTjOQPhTS90ywxyA51Rq4PypXhkmUT02NA34n7PxpWzTHnWvEhulOIF7K+lCFTVe6ZPm2vF55hcD/AI1OSyYqE40utJB76MDVi9qd0dweHWzYz/DO7BvdbG3Orj0ftv8A0lum/wCWHh+kpAqn9DkD2tzEy6urnyVJwuxwc+mKvPBJQILt9gIpriTc6NgNXypv4iRVOhVxrS9HPqr+7GT6yE/erDMdvmcn4VQvwruSwvs5OuXXuc9o1fpUyB8c49aZT8tIno2lbKt9c4qv8XuDhkXbUd2O7L8KsE5wKq/FHwc8sHGfepA76CxsJro9orHCFZs+2ZSf2FW2dzlRumsbE+0KrPQhtScQYZAeZEP+lUz+7/pUtFM808iKxItUUkk5VSdlX9z8qpll3p0Y8f47pG/tlnkRXAeO29g92SUr4+eB+9FObm27JQNJGM5kdDiRm+NFR5GPDbNuoWtOqKK7nGxVF6SGOOeZJFykgV1I35+nxzRRWfJ+qZ7MFsR3oJpos+ye3H9DS0aXY212suPeRkb9KKK562h0nXe1HGf9Mv8AUUqH8wVz56T+1FFIVq4+B8qi+IbA7A4ooqyKOASqYpIRk9UzKoPsqdwP++VOrDstIvrRRQLXMXaXNblwKKKCPurrfHnSNymVx5iiiiIp/RZQl5xOLwdtYx7rLmp3i85j4dx87jED7dntFotJ+9FFRP2Pij/hSO1deuK6ZIoooq2f7Ix9I69YAHxqk9IXYrJp54wB7OS2BRRVZ7Wi82NmlnaQoMflxdoj/Ec94n4mmHQ6862G6ddjLdzEse9oXCj9qKKz/td2U/LHH4U6RcQaJQI1eRnbCqi5ZvE/pRRRTGdIt1X/2Q==";
        const messages = [
            {
                mine: true,
                isText: true,
                content: "float向右",
            },
            {
                mine: true,
                isImage: true,
                imagePath: "data:image/jpeg;base64,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",
            },
            {
                mine: false,
                isText: true,
                content: "float向左",
            },
            {
                mine: false,
                isImage: true,
                imagePath: "data:image/jpeg;base64,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",
            },

            {
                mine: true,
                isText: true,
                content: "短对话",
            },
            {
                mine: false,
                isText: true,
                content: "回短对话",
            },
            {
                isDate: true,
                date: new Date(2019, 8, 12, 11, 2, 17),
            },
            {
                mine: true,
                isText: true,
                content: "CSS元素选择器(也称为类型选择器)通过node节点名称匹配元素. 因此,在单独使用时,寻找特定类",
            },
            {
                isDate: true,
            },
            {
                mine: false,
                isText: true,
                content: "CSS元素选择器(也称为类型选择器)通过node节点名称匹配元素. 因此,在单独使用时,寻找特定类",
            },
            {
                mine: true,
                isVoice: true,
                voiceLength: 10,
            },
            {
                mine: false,
                isVoice: true,
                voiceLength: 50,
            },

        ];
        return <Chat
            user={"张学友❥"} messages={messages}
            newMsgRecipient={action("recive")} myAvatarURL={myAvatarUrl} otherAvatarURL={other}/>
    })
    .add("控制聊天", () => <ChatController/>);

