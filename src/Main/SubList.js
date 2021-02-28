import React, { useState, useEffect } from 'react';
// import { persistStore } from 'redux-persist';
import axios from 'axios';
import '../Css/SubList.css';


function List(props) {
    const datas =  JSON.parse(localStorage.getItem('user_id'));
    const [sub_list, setSub_list] = useState(JSON.parse(localStorage.getItem('data_sub')));
    // console.log(data_listsSub);

    useEffect(()=> {
      upLoad()
      ListItem()
    },[props.add])

    // useEffect(()=>{
    //   upLoad()
    // },[])
    
    const upLoad = () => {
            axios.post(`http://54.146.88.72:3000/list/subject/${datas}`)
            .then((res) => {
              console.log(res); 
              //세션 (문자열로만 저장이 되기 때문에 반드시 제이슨을 써야함)
              try {
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
      const group_check = () =>{
        return <>
        <p>sdfds</p>
        </>
      }
      const lists = sub_list.map(item => {
        return (
          <tr className='table_style' style={{
            display : 'block',
            width : '200px',
            backgroundColor: 'white',
            border: 'black soild 1px',
            margin: '10px 0px', }}>
            <td><inupt type='submit'> {item.className} </inupt></td>
          </tr>
        )
      });
      console.log(lists);
      return (
        <table> {lists} </table>
        );
    }

    return(
        <div className='List_Sub'>
          <div>
            <ListItem />
            {/* {listItems} */}
          </div>
        </ div>
    );
}


export default List;