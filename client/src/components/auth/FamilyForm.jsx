import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFamilyMember } from "../redux/actions/familyActions"; // Adjust the import path

const FamilyForm = () => {
    const [familyName, setFamilyName] = useState('');
    const [roleInFamily, setRoleInFamily] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const familyMember = { familyName, roleInFamily };
        dispatch(addFamilyMember(familyMember));
        setFamilyName('');
        setRoleInFamily('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="familyName">Family Name:</label>
                <input
                    type="text"
                    id="familyName"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="roleInFamily">Role in Family:</label>
                <select
                    id="roleInFamily"
                    value={roleInFamily}
                    onChange={(e) => setRoleInFamily(e.target.value)}
                >
                    <option value="">Select a Role</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="grandparent">Grandparent</option>
                    {/* Add more roles as needed */}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FamilyForm;