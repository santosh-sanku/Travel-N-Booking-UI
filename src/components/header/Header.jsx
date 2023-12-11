import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file - for date picker
import "react-date-range/dist/theme/default.css"; // theme css file - for date picker
import { format } from "date-fns"; // for readable format of the date
import { useNavigate } from "react-router-dom";

// the main header component will take prop i.e type
// if type is "list", then disable the advanced search bar option &
// display only the header navbar.

const Header = ({ type }) => {
  // for open the calendar - by default it will be false i.e calendar will be closed.
  const [openDate, setOpenDate] = useState(false);

  // for date
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // for options component to open
  const [openOptions, setOpenOptions] = useState(false);

  // for adult, children & room values
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // function that increase/decrease the values in adults,children and room
  // by passing the name(i.e adult/children/rooms) and operation(i.e i=increase & d=decrease)
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  /**
   * from the above function, we are setting the state (setOptions)
   * and taking the previous state (prev) i.e the object (adult=1, children=0, room=1),
   * & we are returning the previous state,
   * & passing the name & condition is "i" then increase or else decrease the value.
   */

  // for destination name - by default it will be empty string.
  const [destination, setDestination] = useState("");

  /**
   * we used react-router navigate,
   * used useNavigate hook.
   * using this we can redirect our users to any component any page.
   */
  const navigate = useNavigate();

  /**
   * we are redirecting our user to hotels page.
   * & also we can pass any state here, right now we are sending
   * destination , dates , options.
   */
  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      {/** if type is list then show headerContainer listmode or else show headerContainer as css property */}
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {/** top navbar items */}
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {/** if type is not equal to "list" then enable it (show the below component in the screen) */}
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <button className="headerBtn">Sign in / Register</button>

            {/**Advanced search bar design with a calendar */}
            <div className="headerSearch">
              {/** Destination input field */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              {/** calendar input field */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                {/** from the date state array i.e [0], it will be displayed in MMDDYYY format */}
                {/** when ever we click on this field we change the state of openDate
                 * i.e open calendar - when it is true it changes to false and vice-versa.
                 */}
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>

                {/** open date is true */}
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              {/** options input field i.e adults, children & rooms */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />

                {/** using the state with options */}
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

                {/** if openOptions is true, it will show the below component */}
                {openOptions && (
                  <div className="options">
                    {/** the baove is the options component */}
                    {/** adults */}
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/** children */}
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/** rooms */}
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          disabled={options.room >= 4}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/** search button */}
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
