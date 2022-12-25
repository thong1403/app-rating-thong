import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  

function UserWidget({userId, picturePath}) {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = "#333333";
    const medium = "#A3A3A3";
    const main = "#666666";
    // const getUser = async () => {
    //     const response = await fetch(`http://localhost:3001/users/${userId}`, {
    //       method: "GET",
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await response.json();
    //     setUser(data);
    //   };
    
    //   useEffect(() => {
    //     getUser();
    //   }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    //   if (!user) {
    //     return null;
    //   }
    
    //   const {
    //     firstName,
    //     lastName,
    //     location,
    //     occupation,
    //     viewedProfile,
    //     impressions,
    //     friends,
    //   } = user;
    
    return ( <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          style={{cursor: "pointer"}}
        //   onClick={() => navigate(`/profile/${userId}`)}
        onClick={() => navigate(`/myprofile/`)}

        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {/* {firstName} {lastName} */}
              </Typography>
              {/* <Typography color={medium}>{friends.length} friends</Typography> */}
              <Typography color={medium}> friends</Typography>
            
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}></Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}></Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            {/* <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography> */}
            <Typography color={main} fontWeight="500">
             
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            {/* <Typography color={main} fontWeight="500">
              {impressions}
            </Typography> */}
             <Typography color={main} fontWeight="500">
        
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
           About Us
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
            <i className='fa-solid fa-star'></i>
              <Box>
                <Typography color={main} fontWeight="500">
                <Link to ="/home/history"  style={{textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>Lịch sử Point</Link> 
                </Typography>
                {/* <Typography color={medium}>Hiển thị số point bạn đã nhận</Typography> */}
              </Box>
            </FlexBetween>
          </FlexBetween>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
            <i className='fa-solid fa-ranking-star'></i>
              <Box>
                <Typography color={main} fontWeight="500">
                <Link to ="/home/rank"  style={{textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>Bảng xếp hạng</Link> 

                </Typography>
                {/* <Typography color={medium}>Network Platform</Typography> */}
              </Box>
            </FlexBetween>
            {/* <EditOutlined sx={{ color: main }} /> */}
          </FlexBetween>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
            <i className='fa-solid fa-circle-info'></i>
              <Box>
                <Typography color={main} fontWeight="500">
                <Link to ="/home/introduction"  style={{textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>Giới thiệu Web</Link> 

                </Typography>
                {/* <Typography color={medium}>Network Platform</Typography> */}
              </Box>
            </FlexBetween>
            {/* <EditOutlined sx={{ color: main }} /> */}
          </FlexBetween>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem" >
            <i className='fa-solid fa-question'></i>
              <Box>
                <Typography color={main} fontWeight="500">
                <Link to ="/home/support"  style={{textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>Hỗ trợ giải đáp</Link> 

                </Typography>
                {/* <Typography color={medium}>Network Platform</Typography> */}
              </Box>
            </FlexBetween>
            {/* <EditOutlined sx={{ color: main }} /> */}
          </FlexBetween>
        </Box>
      </WidgetWrapper>);
}

export default UserWidget;