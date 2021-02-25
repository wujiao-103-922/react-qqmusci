import React from 'react'
import './App.css'
// 引入组件
import {BrowserRouter,Route,Switch} from 'react-router-dom'



//引入路由封装的相关信息
import router from './assets/js/router'

import './App.css'
class  App extends React.Component{
   

 renderComponent(r,p){
    
    //  if(r.needlogin){
    //      if(localStorage.getItem('userinfo')){
    //          return <r.component />
    //      }else{
    //          return <Redirect to='/login' />
    //      }
    //  }else{
    //     return <r.component />
    //  }
    return <r.component {...p}  children={r.children} />
 }
    render(){
        return (
            // 所有的路由操作都写在BrowserRouter中
            <BrowserRouter>
               <Switch>   
                   {/* //遍历路由信息 */}
               {
                  router.map((route,key)=>{
                      return <Route key={key} path={route.path}
                        render={(props)=>this.renderComponent(route,props)}
                      ></Route>
                  })
               }
               </Switch>
            </BrowserRouter>
        )
    }  
}
export default App;