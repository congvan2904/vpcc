import "./mapsgoogle.scss";
function MapsGoogle(props) {
  const isShow = props.isToggle;
  console.log(isShow);
  return (
    <>
      {isShow && (
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=vpcc%20nguyen%20duc%20dien&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default MapsGoogle;
