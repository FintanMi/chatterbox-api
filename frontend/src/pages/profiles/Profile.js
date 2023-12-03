import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useSetProfileData } from '../../contexts/ProfileDataContext';
import styles from '../../styles/Profile.module.css';
import { motion } from 'framer-motion/dist/framer-motion';

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
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#DC281E' }}
                            transition={{ type: 'spring', stiffness: 700 }}
                            onClick={() => handleUnfollow(profile)}
                            className={styles.UnfollowBtn}
                        >
                            Unfollow
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 700 }}
                            onClick={() => handleFollow(profile)}
                            className={styles.FollowBtn}
                        >
                            Follow
                        </motion.button>
                    )
                    )}
            </div>
        </div>
    );
};

export default Profile;