import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

interface Props {
    style?: Object;
    id?: string;
    class?: string;
}

export function EditOutline({
    style,
    id,
    class: classnames,
}: Props): ElementNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={style}
            id={id}
            class={classnames}
        >
            <title>Pencil</title>
            <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"
            />
        </svg>
    );
}