import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(mode = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        //nếu  có nodeRef.current thì không lấy phần tử khi kích vào nó và không lấy nút mode ==> sẽ set false
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(mode)
      ) {
        //click vào element không bao gồm dropRef.current tức là ngoài màn hình thì setShowDropDown(false); để ẩn dropdown
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      //cleanup function
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return {
    show,
    setShow,
    nodeRef,
  };
}
