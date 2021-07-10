module.exports = {
    devServer:{
        //mock数据模拟，每次修改都要重启
        before(app,server){
            //接口
            app.get('/api/cartList',(req,res)=>{
                res.json({
                    result:[
                        {id:1,title:"Vue实战项目",price:188,active:true,count:1},
                        {id:2,title:"React实战项目",price:288,active:true,count:1}
               
                    ]
                })
            })
        }
    }
}