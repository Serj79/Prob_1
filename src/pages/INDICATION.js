import React from 'react'
import Table1 from '../components/Table'
import InputTempHun from '../components/InputTempHun'
const Basket = ()=>{
    var data = [
        {id: 1, name: 'Gob', value: '2'},
        {id: 2, name: 'Buster', value: '5'},
        {id: 3, name: 'George Michael', value: '4'}
      ];
    return(
        <div>
            <InputTempHun/>
            <Table1 data={data}/>
        </div>
    )
}

export default Basket;