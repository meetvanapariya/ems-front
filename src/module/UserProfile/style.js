import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    profileDiv: {
        display: "flex",
        alignItems:"center",
        // marginLeft:"15px"
    },
    profileDetails :{
        marginTop: "10px",
        display : "flex",
        justifyContent : "space-around",
        padding: "20px",
        alignItems: "center"
    },
    joingDetails :{
        margin : "25px 0 25px 0",
    },
    contactDetails :{
        margin : "25px 0 25px 0",
    },
    personalDetails : {
        margin : "25px 0 25px 0",
    },
    profileData: {
        width: "40%",
        "& p": {
            margin : "25px 0 25px 0",
            width : "100%"
        }
    },
    avatarDiv:{
        textAlign:"center"
    },
    avatarImgDiv : {
        display:"flex",
        justifyContent:"center",
        "& .MuiAvatar-circular": {
        height: "160px",
        width : "160px"
        }
    },
    divder : {
        marginTop : "10px",
        marginLeft : "0px"
    },
    icons :{
        fontSize : "30px",
        marginRight : "10px",
    },
    marginBtn : {
        marginRight: "10px"
    },
    docImg : {
        maxWidth:"250px",
        maxHeight : "250px",
        cursor:"pointer",
        borderRadius : "10px",
    },
    documentBox : {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center"
    },
    docText : {
        fontSize : "20px",
        color:"grey",
        textAlign : "center",
        marginTop : "10px",
        marginBottom : "10px"
    },
    // ImgBox : {
    //     position : "relative"
    // },
    ImgBoxButton : {
        // position : "absolute",
        // top : "-10px",
        // right : "-10px",
        color : "red",
        backgroundColor : "orange"
    },
    docDesBox : {
        marginTop : "30px"
    },
    docSubmitBox : {
        position : "absolute",
        bottom : "30px",
        right : "30px"
    },
    docInnerBox : {
        "& tr th" : {
            textAlign : "center"
        },
        "& tr td" : {
            textAlign : "center"
        }
    }
}));
export default useStyles;
