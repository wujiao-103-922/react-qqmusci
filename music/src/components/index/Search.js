import React from 'react'
import '../../assets/css/search.css'

class Search extends React.Component{
    constructor(){
        super()
        this.state={
          userinp:"",  //获取用户表单输入值
          songs:[], //用户搜索关键词后显示的歌曲
          hots:[],//热门搜索
        }
       
    }
    fn(e){
        this.setState({
            userinp:e.target.value
        })
    }
    fn1(e){
        if(e.keyCode===13){
            if(this.state.userinp){
                this.$axios.get(this.$api.search+'?keywords='+this.state.userinp)
                .then(res=>{
                    console.log(res.data,'userinp');
                    this.setState({
                        songs:res.data.result.songs,
                        hots:[]
                    })
                })
            }else{
                this.$axios.get(this.$api.searchhot)
                .then(res=>{
                    console.log(res.data.result,'searchhot');
                    this.setState({
                        hots:res.data.result.hots,
                        songs:[]
                    })               
                })
            }
            
        }

    }
    keys(ind){
        console.log(ind);
        let words=this.state.hots[ind].first;
        this.setState({
            userinp:words
        })
    }
    componentDidMount(){
        this.$axios.get(this.$api.searchhot)
            .then(res=>{
                console.log(res.data.result,'searchhot');
                this.setState({
                    hots:res.data.result.hots
                })               
            })
    }
    render(){
        return (
          <div>
                <div className='search'> 
                <p><img src={require('../../assets/img/search.png')}   alt=''/>
                <input value={this.state.userinp} onKeyUp={this.fn1.bind(this)} onChange={this.fn.bind(this)} type="text" placeholder='请输入关键词'/></p>
                </div>
                <ul className='songslist'>
                    {
                        this.state.songs.map((item,index)=>{
                                
                            return <li key={index}><h5>{item.name}</h5>
                                    
                                   {
                                    item.artists.map((value,index)=>{
                                             let sep=item.artists.length>1 && index !=item.artists.length-1?<i> / </i>:""
                                             return (<span key={index}>{value.name} {sep}</span>)
                                    })

                                   }
                                   </li>
                                   
                                
                        })
                    }
                </ul>
                <div>
                <ul className='hots'>
                    {
                        this.state.hots.map((item,index)=>{                            
                         return <li key={index} onClick={this.keys.bind(this,index)}><h5>{item.first}</h5>                      
                                </li>                             
                        })
                    }
                </ul>
                </div>
          </div>

        )
    }  
}

export default Search