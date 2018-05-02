const Rize = require('rize');
const path = require('path');
const rize = new Rize();
const target = path.join(__dirname, "..", "..", "doc/e2e")

rize
    .goto('http://localhost:8081/')
    .assertTitle('🉐️Boss')
    .assertSee('奔跑吧，SSR!!!')
    .assertSeeIn('h4', '喂，动物园吗？🐱')
    .clickLink('一条小蛇🐍')
    .assertSeeIn('h3', '首页')
    .clickLink('一只小绵羊🐑')
    .assertSeeIn('h3', '这里是index')
    .clickLink('一个大灰狼🐺')
    .waitForNavigation()
    .assertSee('风骚帅气的代言人')
    .saveScreenshot(`${target}/async.png`)
    .end()

// describe('UI test', () => {
//     it('example test', async () => {


//         rize
//             .goto('http://localhost:8081/')
//             .assertTitle('🉐️Boss')
//             .assertSee('奔跑吧，SSR!!!')
//             .assertSeeIn('h4', '喂，动物园吗？🐱')
//             .clickLink('一条小蛇🐍')
//             .assertSeeIn('h3', '首页')
//             .clickLink('一只小绵羊🐑')
//             .assertSeeIn('h3', '这里是index')
//             .clickLink('一个大灰狼🐺')
//             // .waitForElement()
//             // .assertSee('风骚帅气的代言人')
//             .end()

//         // 做点别的……
//         await rize.end()
//     })
// })