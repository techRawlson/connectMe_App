import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../constant/Color'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import Buttons from './Buttons'
import { CommonActions } from '@react-navigation/native';
import { setUserDetails } from '../Redux/action'


const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const UserDetails = useSelector((item) => item.UserDetails)


    // Common Details
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [father, setFather] = useState("")
    const [dob, setDob] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [profileImage, setProfileImage] = useState("https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")

    //staff
    const [role, setRole] = useState("")
    const [designation, setDesignation] = useState("") //Lecturer
    const [dateOfJoining, setDateOfJoining] = useState("")
    const [qualification, setQualification] = useState("")
    const [department, setDepartment] = useState("")
    const [approvers, setApprovers] = useState("")


    //student
    const [clas, setClas] = useState("")
    const [rollno, setRollno] = useState("")
    const [section, setSection] = useState("")
    const [category, setCategory] = useState("")
    const [addYear, setAddYear] = useState("")
    const [session, setSession] = useState("")
    const fetchData = async () => {

        setGender(UserDetails.gender ? UserDetails.gender : "null")
        setAddress(UserDetails.address ? UserDetails.address : "null")
        setMobile(UserDetails.mobile ? UserDetails.mobile : "null")
        setEmail(UserDetails.email ? UserDetails.email : "null")
        setDob(UserDetails.dob ? UserDetails.dob : "null")
        setName(UserDetails.name ? UserDetails.name : "null")
        try {
            // "data:image/jpeg;base64,"
            setProfileImage(UserDetails.images[0].image ? "data:image/jpeg;base64," + UserDetails.images[0].image : "https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")
            // setProfileImage(UserDetails.images.image ? "data:image/png;base64," + UserDetails.images.image : "null")
        } catch (error) {
            console.log("Photo Not time:", error);
        }

        if (UserDetails.role.toLowerCase() == "admin" || UserDetails.role.toLowerCase() == "staff" || UserDetails.role.toLowerCase() == "superadmin") {
            setFather(UserDetails.fatherName ? UserDetails.fatherName : "null")
            setRole(UserDetails.role.toLowerCase() ? UserDetails.role.toLowerCase() : "null")
            setDesignation(UserDetails.designation ? UserDetails.designation : "null")
            setDateOfJoining(UserDetails.dateOfJoining ? UserDetails.dateOfJoining : "null")
            setQualification(UserDetails.qualification ? UserDetails.qualification : "null")
            setDepartment(UserDetails.department ? UserDetails.department : "null")
            setApprovers(UserDetails.approver ? UserDetails.approver : "null")
            setId(UserDetails.staffId ? UserDetails.staffId : "null")
            setPassword(UserDetails.password ? UserDetails.password : "null")

        } else {
            setFather(UserDetails.fathersName ? UserDetails.fathersName : "null")
            setClas(UserDetails.className ? UserDetails.className : "null")
            setRollno(UserDetails.rollNumber ? UserDetails.rollNumber : "null")
            setSection(UserDetails.section ? UserDetails.section : "null")
            setSession(UserDetails.session ? UserDetails.session : "null")
            setCategory(UserDetails.category ? UserDetails.category : "null")
            setAddYear(UserDetails.admissionYear ? UserDetails.admissionYear : "null")
            setId(UserDetails.studentId ? UserDetails.studentId : "null")
            setPassword(UserDetails.password ? UserDetails.password : "null")
        }
    }

    useEffect(() => {
        fetchData()
        // console.log("New UserDetails:",UserDetails.images[0].image);
    }, [UserDetails])

    const logoutHandler = async () => {
        await AsyncStorage.removeItem("userDetail");
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Reset the stack and set the Login screen as the only screen
            })
        );
        dispatch(setUserDetails([]))

        // await AsyncStorage.removeItem("userDetail");

        // navigation.dispatch(
        //     StackActions.replace("Login")
        // )
        // dispatch(setUserDetails([]))
    };


    return (
        <View style={styles.rootView}>
            <View style={[styles.childViewContainer]}>
                <View>
                    <View style={styles.imageView}>
                        <Image
                            style={styles.image}
                            // source={{ uri: `data:image/png;base64,${base64}` }}
                            source={{ uri: profileImage }}

                        />
                    </View>
                    <View style={styles.detailsViewContainer}>
                        <View style={styles.detailsChildView}>
                            <View style={styles.headingTextView}>
                                <Text style={styles.headingText}>Profile Info:</Text>
                            </View>
                        </View>
                        <View style={styles.detailsChildView}>
                            <View style={styles.textView}>
                                <Text style={styles.textLable}>Name:</Text>
                                <Text style={styles.text}>{name}</Text>
                            </View>

                            {/* <View style={styles.textView}>
                            <Text style={styles.textLable}>DOB:</Text>
                            <Text style={styles.text}>{dob}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textLable}>Address:</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textLable}>Gender:</Text>
                            <Text style={styles.text}>{gender}</Text>
                        </View> */}
                            {
                                UserDetails.role.toLowerCase() == "staff" || UserDetails.role.toLowerCase() == "admin" || UserDetails.role.toLowerCase() == "superadmin" ?
                                    <View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Mobile:</Text>
                                            <Text style={styles.text}>{mobile}</Text>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Email:</Text>
                                            <Text style={styles.text}>{email}</Text>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Designation:</Text>
                                            <Text style={styles.text}>{designation}</Text>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Department:</Text>
                                            <Text style={styles.text}>{department}</Text>
                                        </View>
                                        {/* <View style={styles.textView}>
                                        <Text style={styles.textLable}>Role:</Text>
                                        <Text style={styles.text}>{role}</Text>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable}>DOJ:</Text>
                                        <Text style={styles.text}>{dateOfJoining}</Text>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable}>Qualification:</Text>
                                        <Text style={styles.text}>{qualification}</Text>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable}>Approvers:</Text>
                                        <Text style={styles.text}>{approvers}</Text>
                                    </View> */}
                                    </View>
                                    :
                                    <View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Father:</Text>
                                            <Text style={styles.text}>{father}</Text>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Class:</Text>
                                            <Text style={styles.text}>{clas}</Text>
                                        </View >
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable} >Section:</Text>
                                            <Text style={styles.text} >{section}</Text>
                                        </View>
                                        <View style={styles.textView}>
                                            <Text style={styles.textLable}>Roll No:</Text>
                                            <Text style={styles.text}>{rollno}</Text>
                                        </View>
                                        {/*
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable} >Session:</Text>
                                        <Text style={styles.text} >{session}</Text>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable} >Category:</Text>
                                        <Text style={styles.text} >{category}</Text>
                                    </View>
                                    <View style={styles.textView}>
                                        <Text style={styles.textLable} >Adm. year:</Text>
                                        <Text style={styles.text} >{addYear}</Text>
                                    </View> */}
                                    </View>
                            }
                        </View>
                        <View style={styles.detailsChildView}>
                            <View style={styles.textView}>
                                <Text style={styles.textLable}>Login Id:</Text>
                                <Text style={styles.text}>{id}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textLable}>Password:</Text>
                                {showPassword ?
                                    <Text style={[styles.text, { alignItems: "center", justifyContent: "center", }]} onPress={() => setShowPassword(!showPassword)}>******</Text> :
                                    <Text style={styles.text} onPress={() => setShowPassword(!showPassword)}>{password}</Text>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.btnView}>
                    <Buttons title={"Logout"} fontSize={15} onClick={logoutHandler} />
                </View>
            </View>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: Color.Page_Background_Color,
    },
    childViewContainer: {
        width: "80%",
        marginTop: 45,
        // borderWidth: 0.5,
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: "auto",
        // backgroundColor: Color.Page_Background_Color,
        backgroundColor: "white",
        elevation: 10,
    },
    imageView: {
        // alignItems: "center",
        marginHorizontal:"auto",
        backgroundColor:Color.Page_Background_Color,
        elevation:10,
        borderRadius: 40,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    headingTextView: {
    },
    headingText: {
        color: Color.Table_Row_Text_Color,
        fontSize: 16

    },
    detailsViewContainer: {

    },
    detailsChildView: {
        marginVertical: 7
    },
    textView: {
        flexDirection: "row",
        marginVertical: 2
    },
    textLable: {
        flex: 2,
        fontWeight: "600",
        fontSize: 16,
        color: Color.Table_Row_Text_Color
    },
    text: {
        flex: 3,
        fontSize: 16,
        color: Color.Table_Row_Text_Color
    },
    btnView: {
        marginTop: 50,
        width: 150,
        marginHorizontal:"auto"
    }
})