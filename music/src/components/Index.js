import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Recommend from './index/Recommend'
import Hot from './index/Hot'
import Search from './index/Search'
import Myhead from './pages/Myhead'

import '../index.css'

class  Index extends React.Component{
    render(){
        return (
            <div>
               <Myhead></Myhead>

            <main>
               <Switch>   
                {/* 路由封装 */}
                {/* <Route path="/recommend" component={Recommend}></Route>
                <Route path="/hot" component={Hot}></Route>
                <Route path="/search"  component={Search}></Route>
                <Redirect path="*" to="/recommend"></Redirect> */}

                {
                  this.props.children.map((item,index)=>{
                      if(item.path==='*'){
                          return (<Redirect key={index} path={item.path} to={item.redirect}></Redirect>)
                      }else{
                          return (<Route key={index} path={item.path} component={item.component}></Route>)
                      }
                  })
                }
               </Switch>
            </main>
            </div>

        )
    }
}

export default Index