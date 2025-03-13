import { useDispatch } from "react-redux";
import { useState } from "react";

import { createUser } from "../../store/usersReducer";
import ListItem from "./NewAccountFormListItem";
import FollowButtonLinks from "./FollowButtonLinks";

import "./NewAccountForm.scss";
import "./FollowButtonLinks.scss";

const NewAccountForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      createUser({ email: email, password: password.password })
    ).catch(async (res) => {
      const errors = res.message.split(",");

      if (res?.message) {
        setErrors(errors);
      } else {
        setErrors([res.statusText]);
      }
    });
  };

  const isPasswordValid = () => {
    return Object.values(password).every((value) => value);
  };

  const mixOfLettersAndNumbers = (password) => {
    const regex = /^(?=.*[A-Za-z0-9])(?=.*\d)/;
    return regex.test(password);
  };

  const atLeastOneSpecialCharacter = (password) => {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(password);
  };

  const atLeastOneUppercaseAndLowerCaseLetter = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const changedPassword = e.target.value;

    let newPass = {
      password: changedPassword,
      1: false,
      2: false,
      3: false,
      4: false,
    };

    if (changedPassword.length >= 8) {
      newPass[1] = true;
    } else {
      newPass[1] = false;
    }

    if (mixOfLettersAndNumbers(changedPassword)) {
      newPass[2] = true;
    } else {
      newPass[2] = false;
    }

    if (atLeastOneSpecialCharacter(changedPassword)) {
      newPass[3] = true;
    } else {
      newPass[3] = false;
    }

    if (atLeastOneUppercaseAndLowerCaseLetter(changedPassword)) {
      newPass[4] = true;
    } else {
      newPass[4] = false;
    }

    setPassword(newPass);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login_form">
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>*{error}</li>
          ))}
        </ul>
        <div className="account_inputs_container">
          <label className="form_first_element account_inputs__label">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </label>

          <label className="account_inputs__label">
            Password
            <input
              type="password"
              value={password.password}
              onChange={handlePasswordChange}
              placeholder="Create Password"
            />
          </label>

          <ul className="validation_list">
            <ListItem
              text={"At least 8 characters"}
              valid={password[1]}
              password={password.password}
            />
            <ListItem
              text={"Mix of letters and numbers"}
              valid={password[2]}
              password={password.password}
            />
            <ListItem
              text={"Contains a special character"}
              valid={password[3]}
              password={password.password}
            />
            <ListItem
              text={"Mix of uppercase and lowercase letters"}
              valid={password[4]}
              password={password.password}
            />
          </ul>

          <button
            type="Submit"
            id="submit_button"
            disabled={!isPasswordValid()}
          >
            Submit
          </button>
          <button
            type="Submit"
            id="submit_button"
            disabled={!isNotValid()}
          >
            Add example button
          </button>

          <div id="login_form__terms_and_conditions">
            <p>
              By submitting, I accept Villow's{" "}
              <a
                id="login_form__terms_and_conditions__terms_of_use_link"
                href="https://www.zillow.com/z/corp/terms/"
              >
                terms of use.
              </a>
            </p>
          </div>
        </div>

        {/* Follow button links as a separate component, because we also need it on sign in tab */}
        <FollowButtonLinks />
      </form>
    </>
  );
};

export default NewAccountForm;
