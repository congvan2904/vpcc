import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllContract } from "../../redux/features/contractsSlice";
import formatDate from "../../helpers/formatDate";
import "./body-right-new-contract-old.scss";
import capitalizeFirstLetterOfEachWord from "../../helpers/capitalizeFirstLetterOfEachWord";

const BodyRightNewContractOld = () => {
  const { allContract } = useSelector((state) => state.contracts);
  console.log(allContract);
  // const [items, setItems] = useState([]);
  // const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const dispatch = useDispatch();

  const fetchData = ({ page }) => {
    console.log({ page });
    dispatch(getAllContract({ page, page_size: 50 }));
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      // console.log("1111", page);
      setPage(page + 1);
      // console.log("2222", page);

      fetchData({ page });
    }
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [page]);

  const divRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const div = divRef.current;
      if (div.scrollHeight - div.scrollTop === div.clientHeight) {
        setPage(page + 1);
        // console.log("2222", page);

        fetchData({ page });
      }
    };

    const div = divRef.current;
    div.addEventListener("scroll", handleScroll);

    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, [page]);
  return (
    <div className="new-contract-old">
      <div className="new-contract-old-body" ref={divRef}>
        <table>
          <thead>
            <tr>
              <td>So hop</td>
              <td>So ho so</td>
              <td>Thu ky</td>
              <td>Cong chung vien</td>
              <td>Ten Ho so</td>
              <td>Ten khach hang</td>
              <td>So dien thoai</td>
              <td>Ngay tao</td>
            </tr>
          </thead>
          <tbody>
            {allContract.map((item, index) => (
              <tr key={index}>
                <td>{item.sohop}</td>
                <td>{item.item.id_contract}</td>
                <td>
                  {capitalizeFirstLetterOfEachWord(
                    item.item.id_user_secretary.username
                  )}
                </td>
                <td>
                  {capitalizeFirstLetterOfEachWord(
                    item.item.id_user_notary.username
                  )}
                </td>
                <td>{capitalizeFirstLetterOfEachWord(item.item.name)}</td>
                <td>{capitalizeFirstLetterOfEachWord(item.item.note)}</td>
                <td>{item.item.phone}</td>
                <td>{formatDate(item.item.date_create)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BodyRightNewContractOld;
