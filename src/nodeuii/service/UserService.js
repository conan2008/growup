import { resolve } from "dns";

class UserService {

    getData(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = [{
                    name: "袁大头",
                    desr: "风骚帅气的代言人"
                },{
                    name: "锦栋",
                    desr: "苏州小王子"
                },{
                    name: "树辉",
                    desr: "come on 新同学"
                },{
                    name: "同学",
                    desr: "不学习去日本了，不知道干嘛去了"
                },{
                    name: "庆哥",
                    desr: "找个好人就嫁了吧"
                },{
                    name: "元",
                    desr: "一组加油弄啊"
                },]
                resolve(result)
            }, 1000)
        })
    }
}

export default UserService;