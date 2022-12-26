import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarHomePage from "../navbarhomepage/NavbarHomePage";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
    // const getUser = async () => {
    //   const response = await fetch(`http://localhost:3001/users/${userId}`, {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   const data = await response.json();
    //   setUser(data);
    // };
  
    // useEffect(() => {
    //   getUser();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    // if (!user) return null;
    return ( 
        <Box>
        <NavbarHomePage />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {/* <UserWidget userId={userId} picturePath={user.picturePath} /> */}
            <UserWidget/>

            <Box m="2rem 0" />
            {/* <FriendListWidget userId={userId} /> */}
            <FriendListWidget />

          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {/* <MyPostWidget picturePath={user.picturePath} /> */}
            <MyPostWidget />

            <Box m="2rem 0" />
            {/* <PostsWidget userId={userId} isProfile /> */}
            <PostsWidget />

          </Box>
        </Box>
      </Box>
     );
}

export default ProfilePage;