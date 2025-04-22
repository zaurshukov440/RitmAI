const CornerElements = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-xl"></div>
    </>
  );
};
export default CornerElements;
