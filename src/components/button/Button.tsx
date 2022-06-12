import React, {FC} from 'react';

type ButtonType = {
    name: string
    onClickHandler: () => void
    isDisabled?: boolean
    style?: string
}
export const Button: FC<ButtonType> = ({name, onClickHandler, isDisabled, style}) => {

    return (
        <button
            onClick={onClickHandler}
            disabled={isDisabled}
            className={style}
        >
            {name}
        </button>
    );
};