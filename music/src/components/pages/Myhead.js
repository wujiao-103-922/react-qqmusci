import React from 'react'
import {Link} from 'react-router-dom'


class  Myhead extends React.Component{
   
    render(){
        return (
        
            <header>
                <p><span className='title'>优音乐</span><span className='download'>下载APP</span></p>
                <ul>
                    <li><Link to='/recommend'>推荐</Link></li>
                    <li><Link to='/hot'>热歌榜</Link></li>
                    <li><Link to='/search'>搜索</Link></li>
                </ul>
            </header>


        )
    }
}

export default Myhead