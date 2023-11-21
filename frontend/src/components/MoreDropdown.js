import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/MoreDropdown.module.css';

const Dots = React.forwardRef(({ onClick }, ref) => (
    <i
        className='fas fa-ellipsis-v'
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropdown = () => {
    return (
        <Dropdown className='ml-auto' drop='left'>
            <Dropdown.Toggle as={Dots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => { }}
                    aria-label='edit'
                >
                    <i className='fas fa-edit' /> Edit
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => { }}
                    aria-label='delete'
                >
                    <i className='fas fa-trash-alt' /> Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MoreDropdown;