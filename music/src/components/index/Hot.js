import React from 'react'
import '../../assets/css/hot.css'
class Hot extends React.Component{
    constructor(){
        super()
        this.state = {
            updateTime:"",   //热歌榜日期  updateTime
            coverImg:"",    //有动态id时显示在最上面的图片
            name:'',
            songs:[],//歌单列表显示请求返回的数据
        }
    }

    componentDidMount(){
        let url=this.props.match.params.id?this.$api.songList+'?id='+this.props.match.params.id:this.$api.toplist;
        this.$axios.get(url)
         .then(res=>{
            console.log(res.data);
            let date=new Date(res.data.playlist.updateTime);
            let month=date.getMonth()+1>9?date.getMonth()+1:'0'+date.getMonth()+1
            let day=date.getDate()>9?date.getDate():'0'+date.getDate();
            this.setState({
                 coverImg:res.data.playlist.coverImgUrl,
                 name:res.data.playlist.name,
                 songs:res.data.playlist.tracks,
                 updateTime:`${month}月${day}日`,
             })
         })

         
    }

    render(){
        console.log(this.state.songs,'allsongs')
        let picitem;
        let backbtn;
        // 有动态id则为推荐歌单进入的hot组件
        if(this.props.match.params.id){
            picitem=(
              <div>
                  <p className="banner"><span>{}</span><img src={this.state.coverImg} />
                  </p>
                  <ul>
                    {
                        this.state.songs.map((item,index)=>{
                                
                            return <li key={index}><h5>{item.name}</h5>
                                     {
                                         item.ar.map((value,index)=>{
                                            let sep=item.ar.length>1 && index !=item.ar.length-1?<i> / </i>:""
                                            return (<span key={index}>{value.name}{sep}</span>)
                                         })
                                     }
                                     
                               
                                   </li>
                                   
                                
                        })
                    }
                </ul>
                  
              </div>
              
              
            )
        }else{
            backbtn=(<div className='songslist'>
                <p className="banner"><span>{}</span><img src={this.state.coverImg} />
                </p>
               <ul>
                    {
                        this.state.songs.map((item,index)=>{
                                
                            return <li key={index}><h5>{item.name}</h5>
                                     {
                                         item.ar.map((v,i)=>{
                                           return  <h6 key={i}>{v.name}</h6>
                                         })
                                     }
                               
                                   </li>
                                   
                                
                        })
                    }
                </ul>
            </div>)
        }
        return (
            console.log(this.props.match.params,'动态id'),//获取动态ID
            <div>
               <div className="mask" >
                   {picitem}
                   
               </div>
               <div className='songs'>
                   {backbtn}
               </div>
             
            </div>
        )
    }
}

export default Hot