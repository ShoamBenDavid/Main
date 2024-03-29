export const FAMILY_ADD_REQUEST = 'FAMILY_ADD_REQUEST';
export const FAMILY_ADD_SUCCESS = 'FAMILY_ADD_SUCCESS';
export const FAMILY_ADD_FAIL = 'FAMILY_ADD_FAIL';
// src/redux/actions/familyActions.js
import {
    FAMILY_ADD_REQUEST,
    FAMILY_ADD_SUCCESS,
    FAMILY_ADD_FAIL,
  } from '../types/familyActionTypes';
  import { fetchNoToken } from '../../helpers/fetch';
  import Swal from 'sweetalert2';
  
  // Async action creator for adding a family member
  export const addFamilyMember = (familyMemberData) => async (dispatch) => {
    try {
      dispatch({ type: FAMILY_ADD_REQUEST });
  
      const response = await fetchNoToken('/api/family', familyMemberData, 'POST');
      const data = await response.json();
  
      if (data.ok) {
        dispatch({
          type: FAMILY_ADD_SUCCESS,
          payload: data.familyMember, // Assuming the API returns the added family member
        });
        Swal.fire('Success', 'Family member added successfully.', 'success');
      } else {
        dispatch({
          type: FAMILY_ADD_FAIL,
          payload: data.message || 'Failed to add family member',
        });
        Swal.fire('Error', data.message || 'Failed to add family member', 'error');
      }
    } catch (error) {
      dispatch({
        type: FAMILY_ADD_FAIL,
        payload: error.message || 'Something went wrong',
      });
      Swal.fire('Error', error.message || 'Something went wrong', 'error');
    }
  };