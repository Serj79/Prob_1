import React, {Component} from 'react'

        
import '../css/Table.css'
// import '../dist/react-bootstrap-table-all.min.css'
function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    alert(`You just selected '${row['name']}'`)
  }
}
const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  unselectable: [2],
  selected: [1],
  onSelect: onSelectRow,
  bgColor: 'gold'
};
class Table1 extends Component {
 
  render() {
    console.log('ssss',this.props.data)
    return (
      <div>
       
      </div> 
    )
  }
}
export default Table1