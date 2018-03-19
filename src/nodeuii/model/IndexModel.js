import { resolve } from "dns";

class Index {

    constructor() {

    }

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello action&model!");
            }, 1000);
        });
    }
}

export default Index;
