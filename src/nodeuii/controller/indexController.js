import IndexModel from '../model/IndexModel';

const index = {

    homeAction() {
        return (ctx, next) => {
            ctx.body = {
                data: 'Hello home'
            };
        }
    },

    modelAction() {
        return async (ctx, next) => {
            const indexModel = new IndexModel();
            let result = await indexModel.getData();
            ctx.body = await ctx.render('index', { data: result });
        }
    }
}

export default index;