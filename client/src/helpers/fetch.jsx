const baseUrl = process.env.REACT_APP_API_URL;

export const fetchNoToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; // localhost:5000/api/events

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; // localhost:5000/api/events
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
export const addFamilyMember = (familyMember) => async (dispatch) => {
  try {
      const resp = await fetchNoToken('api/family', familyMember, 'POST');
      const data = await resp.json();
      if (data.ok) {
          dispatch({
              type: actionTypes.ADD_FAMILY_MEMBER_SUCCESS,
              payload: familyMember, // Or payload: data if your API returns the newly created family member
          });
          Swal.fire('Success', 'Family member added successfully', 'success');
      } else {
          Swal.fire('Error', data.msg || 'Failed to add family member', 'error');
      }
  } catch (error) {
      console.error('Error adding family member:', error);
      Swal.fire('Error', 'Please, contact the administrator', 'error');
  }
};
