import React from 'react'
import '../../assets/css/recommend.css'
//轮播图插件
import AwesomeSwiper from 'react-awesome-swiper'
import { Link } from 'react-router-dom';
const config = {
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: true,
    speed: 500,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        bulletElement: 'li',
        hideOnClick: true,
        clickable: true,
    },
    on: {
        slideChange: function () {
            // console.log(this.activeIndex);
        },
    },
};


class Recomment extends React.Component{
    swiperRef = null
    constructor() {
        super()
        this.state={
            bannerarr:[],//轮播图
            personalized:[],//推荐歌单
            newSong:[],//最新音乐
        }
    }
    goNext = () => {//use `this.swiperRef.swiper` to get the instance of Swiper
    this.swiperRef.swiper.slideNext();
    }
    componentDidMount(){
    this.$axios.get(this.$api.bannerUrl)
    .then(res=>{
        this.setState({
            bannerarr:res.data.banners
        })
    })
    this.$axios.get(this.$api.personalized)
    .then(res=>{
        console.log(res.data.result,"personalized")
        this.setState({
            personalized:res.data.result
        })
    })
    this.$axios.get(this.$api.newSong)
    .then(res=>{
        console.log(res.data.result,"newSong")
        this.setState({
            newSong:res.data.result
        })
    })
    }
    render(){
        return(
            <div>
                {/* 首页轮播图 */}
                <div className="banner">
                <AwesomeSwiper ref={ref => (this.swiperRef = ref)} config={config} className="your-classname banner">
                    <div className="swiper-wrapper">
                        {/* <div className="swiper-slide">slider1</div>
                        <div className="swiper-slide">slider2</div>
                        <div className="swiper-slide">slider3</div> */}
                        {
                            this.state.bannerarr.map((item,index)=>{
                                return <div className="swiper-slide" key={index}>
                                    <img src={item.imageUrl} alt=''/>
                                </div>
                            })
                        }
                    </div>
                    {/* <!--左箭头--> */}
                    <div className="swiper-button-prev"></div>
                    {/* <!--右箭头--> */}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-pagination"></div>    
                </AwesomeSwiper>
                </div>

                <div className="recommend">
                    <h4>推荐歌单</h4>
                    <ul>
                        {
                            this.state.personalized.map((item,index)=>{
                                
                                return <Link to={"/songlist/"+item.id} key={index}><li key={index}><img src={item.picUrl} alt=''/><h6>{item.name}</h6></li></Link>
                                   
                                
                            })
                        }
                    </ul>
                </div>

                <div className="newSong">
                    <h4>最新音乐</h4>
                    <ul>
                        {
                            this.state.newSong.map((item,index)=>{
                                
                                return <li key={index}>
                                       <h5>{item.name}</h5> 
                                       {
                                           item.song.artists.map((value,index)=>{
                                             let sep=item.song.artists.length>1 && index !=item.song.artists.length-1?<i> / </i>:""
                                             return (<span key={index}>{value.name} {sep}</span>)
                                           })

                                       }
                                       
                                    </li>
                                   
                                
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Recomment