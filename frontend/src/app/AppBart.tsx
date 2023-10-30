import {
    Box,
    Button,
    AppBar as MuiAppBar,
    Typography,
    styled,
} from "@mui/material";

const AppBar = ({ isLoggedIn, onLogin, onLogout, userInfo }) => {
    return (
        <Box mr={5}>
            {isLoggedIn ? (
                <Box display="flex" alignItems="center">
                    {userInfo && (
                        <Typography variant="body1" fontWeight={700}>
                            Hello {userInfo.name || userInfo.email} !!
                        </Typography>
                    )}
                    <Button variant="contained"
                        style={{
                            backgroundColor: "#8d2cab",
                            fontWeight: "normal",
                            color: "#fff",
                            marginRight: "10px",
                        }} onClick={onLogout} sx={{ ml: 2 }}>
                        Log Out
                    </Button>
                </Box>
            ) : (
                <Button
                    style={{
                        backgroundColor: "#8d2cab",
                        fontWeight: "normal",
                        color: "#fff",
                        marginRight: "10px",
                    }} variant="contained" onClick={onLogin}>
                    Connect with safe
                </Button>
            )}
        </Box>
    );
};

const StyledAppBar = styled(MuiAppBar)`
    && {
      position: sticky;
      top: 0;
      background: ${({ theme }) => theme.palette.background.paper};
      height: 70px;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      border-bottom: 2px solid ${({ theme }) => theme.palette.background.paper};
      box-shadow: none;
    }
  `;

export default AppBar;
