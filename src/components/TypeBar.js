import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../index";

// import { SHOP_ROUTE } from "../utils/constants";
import { observer } from "mobx-react-lite";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  console.log("render");
  return (
    <ListGroup className="list-group">
      <div className="mt-1  flex-column ">
        {device.type.map((type) => (
          <ListGroup.Item
            className="list-group-item"
            style={{ cursor: "pointer" }}
            active={type.id === device.selectedType.id}
            // active={true}
            onClick={() => {
              console.log("3333", device.selectedType.id);
              return device.setSelectedType(type);
            }}
            key={type.id}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </div>
    </ListGroup>
  );
});
export default TypeBar;

// import React, { useContext } from "react";
// import { ListGroup } from "react-bootstrap";
// import { Context } from "../index";
// // import { SHOP_ROUTE } from "../utils/constants";
// import { observer } from "mobx-react-lite";

// const TypeBar = observer(() => {
//     const { device } = useContext(Context);
//     console.log("render");
//     return (
//       <ListGroup>
//         {device.type.map((type) => (
//           <ListGroup.Item
//             style={{ cursor: "pointer" }}
//                     active={type.id === device.selectedType.id}

//                     onClick={() => {
//                                   console.log("type", type);
//                                   console.log("selectedType", device.selectedType);
//                                   return device.setselectedType(type);
//                                 }}
//                     key={type.id}
//                 >
//                     {type.name}
//                 </ListGroup.Item>
//             ))}
//         </ListGroup>
//     );
// });

// export default TypeBar;
