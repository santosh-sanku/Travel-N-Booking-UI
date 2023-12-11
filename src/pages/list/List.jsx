import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  /**
   * we are using react-router dom.
   * we are using useLocation hook.
   */
  const location = useLocation();

  /**
   * we created 3 different states for destination, date & options.
   * since we are using location, the state will be inside location.
   * that is why location.state.(value)
   */
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);

  /** when clicked, DateRanger i.e calendar should open in the left side search bar  */
  const [openDate, setOpenDate] = useState(false);

  return (
    <div>
      <Navbar />

      {/** in the header we are passing a prop as "list"
       * i.e except in the home page, only the header should be visible
       * & the advanced search bar should not be visiable.
       */}
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {/** left side search bar */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            {/** destination section */}
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>

            {/** date sections */}
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>

              {/** when clicked, open openDate */}
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            {/** above we added the DateRange i.e calendar.*/}

            {/** options section */}
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>

            {/** search button */}
            <button>Search</button>
          </div>

          {/** hotels in a list */}
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
