import {styled, Button, makeStyles} from '@material-ui/core'

const StyledButton = styled(Button)({
    borderRadius: 4,
    transitionDuration: ".2s",
    opacity: 1,
    width: 145,
    height: 45,
    "& .MuiButton-label": {
      textTransform: "none",
      fontWeight: 700,
      fontSize: 20,
      color: "white",
    },
  });
  
  const useStyles = makeStyles({
    divider: {
      backgroundColor: "blue",
      height: 0.5,
      margin: "15px 0px",
    },
    input: {
      marginBottom: 10,
      "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: -20,
      },
    },
    rememberMe: {
      margin: "7px 0px",
  
      width: "max-content",
      "& .MuiTypography-root": {
        fontSize: 12,
      },
    },
    submit: {
      background: "rgba(7, 145, 182, 1)",
      margin: "20px 0px 20px auto",
      "&:hover": {
        opacity: 0.8,
        background: "rgba(0, 203, 255, 1)",
      },
    },
    register: {
      textTransform: "none",
      borderColor: "rgba(7, 145, 182, 1)",
      borderWidth: 1.5,
      "& .MuiButton-label": {
        fontWeight: "normal",
        color: "rgba(7, 145, 182, 1)",
      },
    },
  });

  export {
    useStyles,
    StyledButton,
  }