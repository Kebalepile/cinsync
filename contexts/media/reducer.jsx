import {
  File_Names,
  Folder_Handler,
  Media_Extension,
  MP_File,
  Unique_Id,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case Unique_Id:
    case MP_File:
    case File_Names:
    case Media_Extension:
    case Folder_Handler:
      return updateState(state, action.payload);
    default:
      return state;
  }
};

function updateState(state, payload) {
  return { ...state, ...payload };
}
