import {
  File_Names,
  Folder_Handler,
  Media_Extension,
  MP_File,
  AUTO_PLAY,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case AUTO_PLAY:
      return updateState(state, action.payload);
    case MP_File:
      return updateState(state, action.payload);
    case File_Names:
      return updateState(state, action.payload);
    case Media_Extension:
      return updateState(state, action.payload);
    case Folder_Handler:
      return updateState(state, action.payload);
    default:
      return state;
  }
};

function updateState(state, payload) {
  return { ...state, ...payload };
}
