import React, { Component } from "react";
import cookie from "react-cookies";
import { Dropdown } from "semantic-ui-react";
import { googleTranslate } from "../utils/googleTranslate";
import { Trans } from "react-i18next";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Swal from "sweetalert2";
import { onDownload, sendForm } from "../usefull/usefulFunctions";
import { withRouter } from "react-router-dom";
import { PureComponent } from "react";

class TranslateComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tranlatedObjJson: null,
      languageCodes: [],
      language: cookie.load("language") ? cookie.load("language") : "en",
      jsObjectJson: this.props.jsObjectJson,
    };
  }

  componentDidMount() {
    googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
      getLanguageCodes(languageCodes);
    });

    const getLanguageCodes = (languageCodes) => {
      this.setState({ languageCodes });
    };
  }

  render() {
    const { languageCodes, language, jsObjectJson } = this.state;
    const { location, history } = this.props;
    const options = languageCodes.map((lang) => {
      return {
        key: lang.language,
        value: lang.language.toLowerCase(),
        text: lang.name,
      };
    });

    let onDownloadHolder = () => {
      (async () => {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputPlaceholder: "Type your JSON name here...",
          inputAttributes: {
            "aria-label": "Type your message here",
          },
          showCancelButton: true,
        });

        if (text) {
          sendForm(text, JSON.stringify(jsObjectJson));
          onDownload(jsObjectJson, text);
          history.push("/list");
        }
      })();
    };

    return (
      <div className="mb-2">
        <div>
          <h3>
            <b>
              {" "}
              <Trans i18nKey="instruction.2"></Trans>
            </b>
          </h3>
          <button
            disabled={this.props.jsObjectJson ? false : true}
            className="row justify-content-center align-items-center my-2 btn btn-toolbar w-100 bg-white "
          >
            <p className="text-dark ">
              <b>
                {" "}
                <Trans i18nKey="description.part5"></Trans>
              </b>
            </p>
            <Dropdown
              className=" col-lg-2 form-control select-language  mx-3 mb-3 ui floating dropdown labeled search icon button"
              placeholder={"English"}
              search
              options={options}
            />

            <p className="text-dark ">
              <b>
                {" "}
                <Trans i18nKey="description.part6"></Trans>
              </b>
            </p>
            <Dropdown
              className=" col-lg-2 form-control select-language mx-3 mb-3 ui floating dropdown labeled search icon button"
              placeholder={"English"}
              search
              options={options}
              onChange={(event, { value }) => this.changeHandler(value)}
            />
          </button>
        </div>
        <div className="  mt-2">
          <h3>
            <b>
              {" "}
              <Trans i18nKey="instruction.3"></Trans>
            </b>
          </h3>
          <div className="col">
            <JSONInput
              reset={true}
              confirmGood={false}
              viewOnly={true}
              placeholder={this.state.tranlatedObjJson}
              //   {"yes": "yes"}
              error={false}
              locale={locale}
              colors={{
                string: "#DAA520",
              }}
              height={"220px"}
              width={"940px"}
            />
          </div>
          <button
            disabled={this.props.jsObjectJson ? false : true}
            onClick={onDownloadHolder}
            type="button"
            className=" btn btn-info "
          >
            {" "}
            <i className="fas fa-download"></i>{" "}
            <Trans i18nKey="description.part2"></Trans>
          </button>
        </div>
      </div>
    );
  }

  changeHandler = (language) => {
    let jsObjectJson = this.props.jsObjectJson;
    let cookieLanguage = cookie.load("language");
    let transjsObjectJson = "";

    const translating = (transjsObjectJson) => {
      if (jsObjectJson !== transjsObjectJson) {
        this.setState({ jsObjectJson: transjsObjectJson });
        cookie.save("jsObjectJson", transjsObjectJson, { path: "/" });
      }
      this.setState({ tranlatedObjJson: JSON.parse(transjsObjectJson) });
    };

    if (language !== cookieLanguage) {
      googleTranslate.translate(
        jsObjectJson,
        language,
        function (err, translation) {
          transjsObjectJson = translation.translatedText;
          translating(transjsObjectJson);
        }
      );
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };
}

export default withRouter(TranslateComp);
