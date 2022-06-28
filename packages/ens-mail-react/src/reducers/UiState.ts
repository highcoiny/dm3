import { ActionMap } from './shared';
import * as Lib from 'ens-mail-lib';
import { stat } from 'fs';

export enum SelectedRightView {
    Error,
    Chat,
    UserInfo,
}

export interface UiState {
    showAddContact: boolean;
    selectedRightView: SelectedRightView;
    maxLeftView: boolean;
    show: boolean;
    lastMessagePull: number;
}

export enum UiStateType {
    SetShowAddContact = 'SET_SHOW_ADD_CONTACT',
    SetSelectedRightView = 'SET_SELECTED_RIGHT_VIEW',
    SetMaxLeftView = 'SET_MAX_LEFT_VIEW',
    ToggleShow = 'ToggleShow',
    SetLastMessagePull = 'SET_LAST_MESSAGE_PULL',
}

export type UiStatePayload = {
    [UiStateType.SetShowAddContact]: boolean;
    [UiStateType.SetSelectedRightView]: SelectedRightView;
    [UiStateType.SetMaxLeftView]: boolean;
    [UiStateType.ToggleShow]: undefined;
    [UiStateType.SetLastMessagePull]: number;
};

export type UiStateActions =
    ActionMap<UiStatePayload>[keyof ActionMap<UiStatePayload>];

export function uiStateReducer(
    state: UiState,
    action: UiStateActions,
): UiState {
    switch (action.type) {
        case UiStateType.SetShowAddContact:
            if (state.showAddContact === action.payload) {
                return state;
            } else {
                Lib.log(`[UI] Set show add contact form ${action.payload}`);
                return {
                    ...state,
                    showAddContact: action.payload,
                };
            }

        case UiStateType.SetSelectedRightView:
            if (state.selectedRightView === action.payload) {
                return state;
            } else {
                Lib.log(`[UI] Change right view to ${action.payload}`);
                return {
                    ...state,
                    selectedRightView: action.payload,
                };
            }

        case UiStateType.SetMaxLeftView:
            Lib.log(`[UI] maxLeftView: ${action.payload}`);
            return {
                ...state,
                maxLeftView: action.payload,
            };

        case UiStateType.ToggleShow:
            Lib.log(`[UI] toggle show`);
            return {
                ...state,
                show: !state.show,
            };

        case UiStateType.SetLastMessagePull:
            Lib.log(`[UI] set timestamp of last message pull`);
            return {
                ...state,
                lastMessagePull: action.payload,
            };

        default:
            return state;
    }
}