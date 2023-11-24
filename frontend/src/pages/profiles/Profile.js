import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetProfileData } from '../../contexts/ProfileDataContext';
import styles from '../../styles/Profile.module.css';

const Profile = (props) => {
    const { profile, mobile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
            <div>
                <Link className='align-self-center' to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>
                    {owner}
                </strong>
            </div>
            <div className={`text-right ${!mobile && 'ml-auto'}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button onClick={() => handleUnfollow(profile)}>Unfollow</Button>
                    ) : (
                        <Button onClick={() => handleFollow(profile)}>Follow</Button>
                    )
                    )}
            </div>
        </div>
    );
};

export default Profile;