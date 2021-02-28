import React, { useState, useEffect } from 'react';
// import { persistStore } from 'redux-persist';
import axios from 'axios';
import '../Css/SubList.css';


function List(props) {
    const datas =  JSON.parse(localStorage.getItem('user_id'));
    const [addStdList, setAddStdList] = useState(null);
    const [sub_list, setSub_list] = useState(JSON.parse(localStorage.getItem('data_sub')));
    const [clickSubject, setClickSubject] = useState(null);
    const [question, setQuestion] = useState(null);
    console.log(JSON.parse(localStorage.getItem('user_id')));
    console.log(datas);
    // console.log(data_listsSub);

    useEffect(()=> {
      upLoad()
      ListItem()
    },[props.add])

    // useEffect(()=>{
    //   upLoad()
    // },[])
    // const addStdList = async () => {
    //   await axios.post("url", {}).then(() => {});
    // }
    const upLoad = () => {
            axios.post(`http://54.146.88.72:3000/list/subject/${datas}`)
            .then((res) => {
              console.log(res); 
              //세션 (문자열로만 저장이 되기 때문에 반드시 제이슨을 써야함)
              try {
                console.log(JSON.stringify(res.data.result));
                  localStorage.setItem('data_sub', JSON.stringify(res.data.result));
                  setSub_list(JSON.parse(localStorage.getItem('data_sub')));
                } catch (e) {
                  console.log('과목 리스트 에러' + e);
                }
              // console.log(res.data)
            });
    }
  
    const ListItem = () => {
      if(sub_list == null){
        return (
          <>
            
          </>
        )
      }  
      
      const lists = sub_list.map(item => {

        let myColor = "rgba(204,204,204,0.8)";
        if(item.classOnline){
          myColor = "white";
        }
        console.log(item);
        let ClickEvent = item.className == clickSubject ? (
          <div className="sub_bar" onClick={(e) => listClick(e, item.className)} >
            {item.className}
            <button className='btn_sytle'> 참가 </button>
            <button className='btn_sytle'> 자료실 </button>
            <button className='btn_sytle'> 질문 </button>
          </div>
        ) : <div className="sub_bar" onClick={(e) => listClick(e, item.className)} > {item.className} </div>;
        
        return (
          <tr  className='table_style' style={{
            display : 'block',
            width : '250px',
            height: '30px',
            backgroundColor: myColor,
            border: 'black soild 1px',
            margin: '10px 0px', }}>
             {ClickEvent}
          </tr>
        )
      });

      const listClick = (e, value) => {
        console.log(e.target);
        setClickSubject( clickSubject == value ? null : value);
      }
      console.log(lists);
      return (
        <table> {lists} </table>
        );
    }

    return(
        <div className='List_Sub'>
          <div className="SubList_Subject_Frame">
            <ListItem />
            {/* {listItems} */}
            <div className="SubList_Subject_AddStudent">
              {addStdList}
            </div>
          </div>
        </ div>
    );
}


export default List;