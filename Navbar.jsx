import { useRef, useEffect } from "react";

const Navbar = ({ data, setData }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const search = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = JSON.parse(localStorage.getItem("evalData")).filter(
      (r) =>
        r.restaurantName.toLowerCase().includes(val) ||
        r.address.toLowerCase().includes(val)
    );
    setData(filtered);
  };

  return <input ref={searchRef} placeholder="Search..." onChange={search} />;
};

export default Navbar;
