import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegister } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import useForm from "../../hooks/useForm";
import Alert from "../ui/Alert";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
    familyName: "",
    roleInFamily: "",
    familyId: "", // Added familyId to formValues for optional existing family join
  });
  const { name, email, password, password2, familyName, roleInFamily, familyId } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Dispatch the registration action with all form values, including the optional familyId
      dispatch(startRegister(name, email, password, familyName, roleInFamily, familyId));
    }
  };

  const isFormValid = () => {
    // Validate the form inputs
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (name.trim().length > 32) {
      dispatch(setError("Name length must be max 32 characters"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Passwords do not match"));
      return false;
    } else if (password.length < 8 || password.length > 32 || !validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      dispatch(setError("Password should be 8-32 characters long and include at least 1 number, 1 symbol, 1 lowercase, and 1 uppercase letter"));
      return false;
    } else if (familyName.trim().length === 0) {
      dispatch(setError("Family name is required"));
      return false;
    } else if (!['parent', 'child', 'grandparent'].includes(roleInFamily)) {
      dispatch(setError("Please select a valid role in the family"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <section className="card card--inverse">
      <div className="card__row card__row--left">
        <div className="card__body">
          <h1 className="card__title">Create Account</h1>
          <form className="form" onSubmit={handleRegister}>
            {msgError && <Alert type="error" description={msgError} />}
            <div className="form__field">
              <label htmlFor="name" className="form__label">Name</label>
              <input className="form__input" type="text" name="name" id="name" value={name} onChange={handleInputChange} />
            </div>
            <div className="form__field">
              <label htmlFor="email" className="form__label">Email</label>
              <input className="form__input" type="email" name="email" id="email" value={email} onChange={handleInputChange} />
            </div>
            <div className="form__field">
              <label htmlFor="password" className="form__label">Password</label>
              <input className="form__input" type="password" name="password" id="password" value={password} onChange={handleInputChange} />
            </div>
            <div className="form__field">
              <label htmlFor="password2" className="form__label">Confirm Password</label>
              <input className="form__input" type="password" name="password2" id="password2" value={password2} onChange={handleInputChange} />
            </div>
            <div className="form__field">
              <label htmlFor="familyName" className="form__label">Family Name</label>
              <input className="form__input" type="text" name="familyName" id="familyName" value={familyName} onChange={handleInputChange} />
            </div>
            <div className="form__field">
              <label htmlFor="roleInFamily" className="form__label">Role in Family</label>
              <select className="form__input" name="roleInFamily" id="roleInFamily" value={roleInFamily} onChange={handleInputChange}>
                <option value="">Select Role</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
                <option value="grandparent">Grandparent</option>
              </select>
            </div>
            <div className="form__field">
              <label htmlFor="familyId" className="form__label">Family ID (optional)</label>
              <input className="form__input" type="text" name="familyId" id="familyId" placeholder="Enter existing family ID" value={familyId} onChange={handleInputChange} />
            </div>
            <button className="btn btn-primary" type="submit">Register</button>
          </form>
        </div>
      </div>
      <div className="card__row card__row--colored card__row--right">
        <div className="card__body">
          <h2 className="card__subtitle">Welcome Back!</h2>
          <p className="card__description">To keep connected, please login with your personal information</p>
          <Link className="btn btn-primary btn-primary--outline" to="/auth/login">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
