import React from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import { Trans, useTranslation } from "react-i18next";
function Nav(props) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div className="row justify-content-center align-items-center fixed-top">
      <nav className="navbar navbar-light bg-dark form-control h-25 justify-content-sm-around">
        {/* <!--הוספתי קצת מוזיקה לנאב בר  --> */}
        <div className=" d-flex justify-content-center align-items-center text-info">
          <Trans i18nKey="description.part4"></Trans>
          <i className="fa fa-arrow-right px-1" aria-hidden="true"></i>
          <Popup
            content="Enjoy the music!"
            trigger={
              <div
                style={{
                  position: "relative",
                  width: "50px",
                  height: "34px",
                  overflow: "hidden",
                }}
                className="rounded"
              >
                <div
                  style={{ position: "absolute", top: "-263px", left: "-10px" }}
                >
                  <iframe
                    width="300"
                    height="300"
                    src="https://www.youtube.com/embed/5qap5aO4i9A?playlist=dTbONq0zxRA&rel=0"
                  ></iframe>
                </div>
              </div>
            }
          />
        </div>
        <div classNameName="container-fluid  bg-dark text-white form-control mb-3">
          <div className="container text-center">
            <Link to="/">
              {" "}
              <Trans i18nKey="description.part9"></Trans>
            </Link>
            <Link to="/list">
              {" "}
              <Trans i18nKey="description.part10"></Trans>
            </Link>
          </div>
        </div>
        <div>
          <button
            className="btn-outline-info"
            onClick={() => changeLanguage("en")}
          >
            ENGLISH
          </button>
          <button
            className="btn-outline-info"
            onClick={() => changeLanguage("es")}
          >
            SPANISH
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
