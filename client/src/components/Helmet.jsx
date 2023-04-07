const Helmet = (props) => {
  document.title = `${props.title} - Công Chứng NĐĐ`;
  return <>{props.children}</>;
};

export default Helmet;
