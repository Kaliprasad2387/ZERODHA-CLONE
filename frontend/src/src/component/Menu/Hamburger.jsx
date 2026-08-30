function Hamburger() {

  const toggleMenu = () => {
    document.querySelector(".menu")?.classList.toggle("show");
  };

  return (
    <button
      onClick={toggleMenu}
      style={{
        position:"fixed",
        top:"15px",
        left:"15px",
        zIndex:10000,
        width:"45px",
        height:"45px",
        border:"none",
        borderRadius:"8px",
        background:"#387ed1",
        color:"#fff",
        fontSize:"24px",
        cursor:"pointer",
      }}
    >
      ☰
    </button>
  );
}

export default Hamburger;