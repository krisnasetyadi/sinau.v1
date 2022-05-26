import React,{useState} from "react";
import { Button,Offcanvas } from "react-bootstrap";
import { BiMenu } from "react-icons/bi";

  
 export default function Sidebar({ name, ...props }) {
   const {handleShowSidebar,setHandleShowSidebar} = props
    const [show, setShow] = useState(false);
  console.log('stat',handleShowSidebar)
    const handleClose = () => setHandleShowSidebar(false);
    // const toggleShow = () => setShow((s) => !s);
    // console.log('togglesidebar',toggleShow)
  
    return (
      <div className="side-bar">
        <Offcanvas  style={{backgroundColor:'red',zIndex:1,display:'block',position:'fixed'}} show={handleShowSidebar} onHide={handleClose} {...props} backdrop={false} scroll={true}>
        <Offcanvas.Header >
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
          <Offcanvas.Body style={{marginTop:'80px',flexGrow:0,backgroundColor:'blue'}}>
            menu1
          </Offcanvas.Body>
          <Offcanvas.Body style={{flexGrow:0,backgroundColor:'grey'}}>
            menu2
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }
  
//   function Example() {
//     return (
//       <>
//         {options.map((props, idx) => (
//           <Sidebar key={idx} {...props} />
//         ))}
//       </>
//     );
//   }
  
//   render(<Example />);